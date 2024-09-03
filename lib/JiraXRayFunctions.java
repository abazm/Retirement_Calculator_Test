package com.q.jirafunctions;

import java.io.*;
import java.util.Properties;

import javax.json.JsonArray;
import javax.json.JsonObject;

import org.json.JSONArray;
import org.json.JSONObject;

import io.restassured.RestAssured;
import io.restassured.authentication.PreemptiveBasicAuthScheme;
import io.restassured.http.ContentType;
import io.restassured.response.Response;

public class JiraXRayFunctions {
	public static Properties properties;
	public static String updateTestExecution;
	public static JSONObject json;
	public static JSONArray testArray;
	public static String Issuekey;
	public static String TestPlankey;

	public JiraXRayFunctions(String suitename) {
		json = new JSONObject();
		testArray = new JSONArray();
		PropertiesFile();
		properties.getProperty("UpdateTestExecution");
		System.out.println("Issue Creation: " + updateTestExecution);
		if (updateTestExecution.equalsIgnoreCase("No")) {
			createJsonTemplate(suitename);
		}
		System.out.println("issue template created in constructor");
	}

	public Properties PropertiesFile() {
		properties = new Properties();
		try (InputStream fis = new FileInputStream("CreateJiraIssue.properties")) {
			properties.load(fis);
		} catch (Exception e) {
			System.out.println("Unable to find the specified properties file");
			e.printStackTrace();
			return null;
		}
	}

	public void uploadAttachment(String filePath) {
		if (properties.getProperty("UpdateJiraExecution").equalsIgnoreCase("Yes")) {
			if (properties.getProperty("UploadAttachment").equalsIgnoreCase("Yes")) {
				PreemptiveBasicAuthScheme authSch = new PreemptiveBasicAuthScheme();
				authSch.setUserName(properties.getProperty("UserName"));
				authSch.setPassword(properties.getProperty("Password"));
				RestAssured.authentication = authSch;
				String ReportPath = filePath;

				RestAssured.baseURI = properties.getProperty("JiraBaseURI") + Issuekey + "/attachments";
				Response Reportresponse = RestAssured.given().relaxedHTTPSValidation()
						.headers("X-Atlassian-Token", "nocheck").multiPart(new File(ReportPath)).post();

				System.out.println("Report status Code" + Reportresponse.getStatusCode());
				if (Reportresponse.getStatusCode() == 200) {
					System.out.println("Reports added successfully");
					System.out.println(Reportresponse.getBody().asString());
				} else {
					System.err.println("Report status Code" + Reportresponse.getStatusCode());
					System.err.println("Failed to add Reports" + Reportresponse.getBody().asString());
				}
			} else {
				System.out.println("Upload attachment not required");
			}
		} else {
			System.out.println("Jira test execution not required for upload attachment.");
		}

	}

	public void CreateJiraTestExecutionCycle(String label) throws IOException {
		try {
			RestAssured.reset();
			if (properties.getProperty("UpdateJiraExecution").equalsIgnoreCase("Yes")) {
				RestAssured.baseURI = properties.getProperty("XRayBaseURI"); // baseURI+"/rest/raven/1.0/testexec/"+key
				Response response = RestAssured.given().relaxedHTTPSValidation()
						.headers("Authorization", "Bearer " + properties.getProperty("XRayBearerToken"), "Content-Type",
								ContentType.JSON, "Accept", ContentType.JSON)
						.contentType(ContentType.JSON).body(json.toString()).post();
				System.out.println("Add test status Code" + response.getStatusCode());

				if (response.getStatusCode() == 200) {
					System.out.println("Test added successfully");
					System.out.println(response.getBody().asString());
				} else {
					System.err.println("Add test status Code" + response.getStatusCode());
					System.err.println("Failed to add Test status" + response.getBody().asString());
				}

				if (properties.getProperty("UpdateTestExecution").equalsIgnoreCase("No")) {
					BufferedReader inputStream = new BufferedReader(
							new InputStreamReader(response.getBody().asInputStream()));
					StringBuilder builder = new StringBuilder();
					String line = null;
					while ((line = inputStream.readLine()) != null) {
						builder.append(line);
						builder.append(System.getProperty("line.separator"));
						System.out.println(line);
					}
					String output = builder.toString();
					JSONObject mainObject = new JSONObject(output);
					Issuekey = (String) mainObject.get("key");
					System.out.println("New Test Excution Ks is:" + Issuekey);
				} else {
					Issuekey = properties.getProperty("TestExecutionKey");
					System.out.println("Already created Issue Key:" + Issuekey);
				}
				// updateLabel(label);

			} else {
				System.out.println("Jira test execution not required.");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public JSONObject updateJson(String testkey, String status) {
		try {
			if (properties.getProperty("UpdateJiraExecution").equalsIgnoreCase("Yes")) {
				updateTestExecution = properties.getProperty("updateTestExecution");
				System.out.println("Static Issue creation: " + updateTestExecution);
				if (updateTestExecution.equalsIgnoreCase("Yes")) {
					String key = properties.getProperty("TestExecutionkey");
					System.out.println("Static issue Key: " + key);
					json.put("testExecutionkey", key);

				}
				String[] split = testkey.split(",");
				System.out.println("Length: " + split.length);
				for (int i = 0; i < split.length; i++) {
					JSONObject test = new JSONObject();
					test.put("testkey", split[1]);
					test.put("status", status);
					testArray.put(test);
				}
				json.put("tests", testArray);
				System.out.println(json.toString());
			} else {

				System.out.println("Jira test execution not required.");
			}
			return json;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public void createJsonTemplate(String suiteName) {
		// testArray=new JsonArray();
		JSONObject test = new JSONObject();
		String summary = properties.getProperty("ExecutionSummary") + " for " + suiteName;
		String description = properties.getProperty("ExecutionDescription") + " for " + suiteName;
		String LinktoTestPlan = properties.getProperty("LinktoTestPlan");
		String testPlanId = properties.getProperty("TestPlanId");

		test.put("summary", summary);
		test.put("description", description);
		if (LinktoTestPlan.equalsIgnoreCase("Yes") && !testPlanId.isBlank()) {
			test.put("testPlankey", testPlanId);
			System.out.println("Linked to Test Plan " + testPlanId + " will be done");
		} else if (LinktoTestPlan.equalsIgnoreCase("Yes") && testPlanId.isBlank()) {
			testPlanId = createTestplan();
			test.put("testPlankey", testPlanId);
			System.out.println("Linked to Test Plan " + testPlanId + " will be done");
		}
		json.put("info", test);
	}

	private String createTestplan() {
		// TODO Auto-generated method stub
		PreemptiveBasicAuthScheme authSch = new PreemptiveBasicAuthScheme();
		authSch.setUserName(properties.getProperty("UserName"));
		authSch.setPassword(properties.getProperty("Password"));
		RestAssured.authentication = authSch;

		RestAssured.baseURI = "https://company.atlassian.net/rest/api/2/issue/";
		RestAssured.authentication = authSch;
		String Projectkey = properties.getProperty("ProjectKey");

		String IssuePlan = "add json here";

		Response testPlanResponse = RestAssured.given().relaxedHTTPSValidation().contentType(ContentType.JSON)
				.body(IssuePlan).post();
		System.out.println("Coments status Code" + testPlanResponse.getStatusCode());
		if (testPlanResponse.getStatusCode() == 201) {
			System.out.println("New Test Plan created successfully");
			System.out.println(testPlanResponse.getBody().asString());
		} else {
			System.err.println("Failed to create new issue" + testPlanResponse.getBody().asString());
		}

		BufferedReader inputStream = new BufferedReader(
				new InputStreamReader(testPlanResponse.getBody().asInputStream()));
		StringBuilder builder = new StringBuilder();
		String line = null;
		try {
			while ((line = inputStream.readLine()) != null) {
				builder.append(line);
				builder.append(System.getProperty("line.separator"));
				System.out.println(line);
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String output = builder.toString();
		JSONObject mainObject = new JSONObject(output);
		TestPlankey = (String) mainObject.get("key");
		System.out.println("New Test Plan Key is: " + TestPlankey);
		return TestPlankey;

	}
}