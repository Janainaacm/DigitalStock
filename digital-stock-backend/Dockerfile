FROM eclipse-temurin:17-jdk-alpine as build

WORKDIR /app

COPY . .

RUN chmod +x ./gradlew && ./gradlew bootJar -x test

FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY --from=build /app/build/libs/app.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
