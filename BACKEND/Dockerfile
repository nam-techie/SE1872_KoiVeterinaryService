## Stage 1: Build the application
#FROM maven:3.9.5-amazoncorretto-21-al2023 AS build
#WORKDIR /app
#COPY pom.xml .
#COPY src ./src
#RUN mvn clean package -DskipTests
#
## Stage 2: Run the application
#FROM openjdk:24-slim-bullseye
#WORKDIR /app
#COPY --from=build /app/target/KoiVeterinaryServiceCenter-0.0.1-SNAPSHOT.jar app.jar
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "app.jar"]
