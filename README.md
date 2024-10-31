# Requirements to Run

- **Java 11.0.25**: Download the Java Development Kit (JDK) from [Azul Java Zulu JDKs.](https://www.azul.com/downloads/?version=java-11-lts&package=jdk#zulu)
- **LFR-CLI**: Install the LFR Command Line Interface by following the instructions in the [LFR Documentation.](https://lgdd.github.io/lfr-cli/)

## 1. Initialize the Liferay Bundle

```bash
lfr init
```


After adding the above line, apply the changes to your current session by running:

```bash
source ~/.bashrc
```

## 2. Start the Liferay Server

Once the initialization is complete, you can start the Liferay server with the following command:

```bash
lfr start
```

## 3. Deploy Client Extensions

To deploy client extensions, navigate to the client-extensions directory and run the deployment command:

```bash
cd client-extensions
lfr deploy
```

## 4. Move the To-Do List Widget to the Page

After deploying the client extensions, you can move the To-Do List widget onto your desired page within the Liferay portal.

## 5. Add Action Trigger to Task Object

Integrate the action trigger of your Spring Boot application with the task object to enable interactions and functionalities.

## 6. Run the Spring Boot Application

Finally, to run your Spring Boot application, navigate to the `to-do-list-spring-boot` directory and execute:

```bash
cd to-do-list-spring-boot
../../gradlew bootRun
```
