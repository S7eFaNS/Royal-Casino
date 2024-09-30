FROM gradle:8.5.0-jdk17
WORKDIR /opt/app
COPY ./build/libs/semester3_individual_project-0.0.1-SNAPSHOT.jar ./

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar semester3_individual_project-0.0.1-SNAPSHOT.jar"]