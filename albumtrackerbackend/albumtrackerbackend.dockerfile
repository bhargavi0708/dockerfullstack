
# Stage 1: Build the app
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /lab9-backend

COPY mvnw .          
COPY .mvn/ .mvn
COPY pom.xml ./
RUN chmod +x mvnw

COPY src ./src

RUN ./mvnw clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk

WORKDIR /lab9-backend
COPY --from=builder /lab9-backend/target/*.jar lab9-backend.jar

EXPOSE 1778

ENTRYPOINT ["java", "-jar", "lab9-backend.jar"]