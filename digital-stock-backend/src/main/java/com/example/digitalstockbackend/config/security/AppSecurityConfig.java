package com.example.digitalstockbackend.config.security;

import com.example.digitalstockbackend.config.AppPasswordConfig;
import com.example.digitalstockbackend.config.security.jwt.AuthEntryPointJwt;
import com.example.digitalstockbackend.config.security.jwt.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final AppPasswordConfig appPasswordConfig;
    private final AuthEntryPointJwt unauthorizedHandler;

    @Autowired
    public AppSecurityConfig(CustomUserDetailsService customUserDetailsService, AppPasswordConfig appPasswordConfig, AuthEntryPointJwt unauthorizedHandler) {
        this.customUserDetailsService = customUserDetailsService;
        this.appPasswordConfig = appPasswordConfig;
        this.unauthorizedHandler = unauthorizedHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/auth/signup", "/auth/signin", "/error").permitAll()
                        .requestMatchers(HttpMethod.GET, "/products/**").permitAll()
                        .anyRequest().authenticated());

        http.authenticationProvider(authenticationProvider());

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

       http
               .formLogin(login -> login
                        .loginPage("/login")
                        .defaultSuccessUrl("/")
                        .failureUrl("/login?error=true")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/custom-logout")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("remember-me", "JSESSIONID")
                )
                .rememberMe(rememberMe -> rememberMe
                        .key("secureKeyForRememberMe")
                        .tokenValiditySeconds((int) TimeUnit.DAYS.toSeconds(21))
                        .userDetailsService(customUserDetailsService)
                );

        return http.build();
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(appPasswordConfig.bcryptPasswordEncoder());

        return authProvider;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}

