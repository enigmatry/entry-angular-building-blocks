# Tutorial: Getting started with Entry and Code Generation

## 1. Create a new project from the Entry template

- **If you previously installed Enigmatry.Blueprint.Template** you should remove it since package is now renamed and dotnet will have troubles in resolving the right blueprint command locally
  ```bash
	dotnet new uninstall Enigmatry.Blueprint.Template
  ```

- Install the latest version of the Entry template:
	```sh
  dotnet new install Enigmatry.Entry.Blueprint.Template --nuget-source https://www.nuget.org/packages/Enigmatry.Entry.Blueprint.Template
  ```
	If there is already a version of the template installed, it will update to the latest version.

	- If you need to install a specific version of the template:
  ```bash
  dotnet new install Enigmatry.Entry.Blueprint.Template::VERSION --nuget-source https://www.nuget.org/packages/Enigmatry.Entry.Blueprint.Template
  ```
	where VERSION should be replaced with the specific version you want to install, e.g. 1.1.88
	
- Create a new solution based on the template:
	```
	dotnet new blueprint --name Customer.Project --projectName Customer.Project --appProjectName customer-project --friendlyName 'Customer Project' --allow-scripts yes
  ```
	Parameters
	- *name*: The full name / namespace of the project (i.e Customer.ProjectName)
  - *projectName*: Also the full name / namespace of the project (i.e Customer.ProjectName)
	- *appProjectName*: the kebab-cased name of theproject. (i.e. customer-projectname)
	- *friendlyName*: The human-friendly name
	- *no-restore* (optional, default: false): If specified, skips the automatic restore of the project on create.
	- *no-git* (optional, default: false): If specified, skips git initialization.
	- *httpPort* (optional, default: random port number): Port number to use for the HTTP endpoint in launchSettings.json.
	- *allow-scripts* (optional, default: false): If specified, does not prompt for script execution.
 
 - Open the solution in Visual Studio and confirm that it builds.
 
 - Optional: Update all nuget references (both Enigmatry Entry packages and other packages from nuget.org) to their latest versions. (Be careful, this might break things when upgrading packages to unsupported major versions with breaking changes)
 
 - At this point you can optionally start adding any addtional Entry Building Blocks. Note that this can also be done at any later moment during development, the Entry template already comes with all the required Building Blocks to start developing.
 - Note: For the application to actually work, it is required to have a local database server running. (Sql Server developer edition, whihch can be downloaded [here](https://www.microsoft.com/nl-nl/sql-server/sql-server-downloads))

## 2. Install the latest version of the Entry Code Generator

```
dotnet tool install --global Enigmatry.Entry.CodeGeneration.Tools
```

If there is already a version of the Code Generator installed, it will update to the latest version.

### Important
Make sure that dependencies for NuGet package inside the <<ProjectName>>.Platform.CodeGeneration.Setup are are in sync with the version of codegen dotnet tool.

## 3. Create a new feature
*Before you start, make sure you have imported the Enigmatry.dotsettings resharper file, from the root of the project, as additional settings layer. (From the Visual Studio meu: Extensions -> Resharper -> Manage Options)* 

### Create a feature (for example project)
	
(At any time during these steps, feel free to take a look at the User entity and feature that comes included with the Entry template.)
- In Visual Studio, start by creating your domain object (for example: 'Dog') 
	- In the Customer.Project.Domain project create a folder with the pluralized name of your Entity.
  - Right click the folder, select `Add -> New from template -> Blueprint Entity`, and specify the name (Pascal-cased). This will create your entity, along with Create and Update command (including validations), command handler, Domain events and Queryable extension.
  - (Sometimes the generation of the namespaces fails. You can fix this by hovering over a red-colored Type and selecting `Import '<Missing Namespace>' and other missing references?`).
	- The entity has an Id and a Name property; feel free to expand the Entity and the corresponding Commands and validations.
- Under 'Customer.Project.Infrastructure.Data.Configurations' add a new class for the Configuration of your Entity (i.e. DogConfiguration) and inherit from `IEntityTypeConfiguration<[YourEntity]>`.
	- Now, in the Configure method, you can configure your entity with rules like:
  ```csharp
	builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
  ```
- In the Customer.Project.Api project, in the features folder, create a new folder with the pluralized name of your domain entity (i.e. 'Dogs'). This is where the controller, the dto's for your queries and the request handlers will be placed.
	- Right click the folder, select `Add -> New from template -> Blueprint Feature Get Details Request`, and specify the name of the request like Get[Entity] (i.e. GetDog). Once the C# file is opened type the name of the Entity (Dog) again and press enter; this will fill in the name in the placeholders of the generated files. You now created a request (query) object with Automapper profile, and a request handler that calls into your previously created Domain Entity.
  - We will repeat the previous step to create a request for multiple. Right click the folder again, this time select `Add -> New from template -> Blueprint Feature Get Multiple Request`, and specify the name of the request, but this time plural (i.e. GetDogs). Once the C# file is opened type the name of the Entity (Dog) again and press enter; this will fill in the name in the placeholders of the generated files.
  - If you previously expanded your entity with additional properties, you can add them here to the response classes as well. If you maintain the same name for the properties, Automapper will take care of the mapping.
- Right-click the same folder again, this time select `Add -> New from template -> Blueprint Feature Controller`, and specify the name (Pascal-cased) of your Entity. Once the C# file is opened type the name again and press enter; this will fill in the name in the placeholders of the generated file. You have now created the API Controller for your feature. If all went well, Visual Studio should not show any errors. If it does, correct them.

- See if you you can run your application. If successful, it will open a Swagger UI in the browser, allowing you to test your API.

### db migration

- Go to the [Customer.Project].Data.Migrations project and open the migration commands.txt file.
- In here you will find the command to generate the migration for your new domain entity.
- For example (replace the TODO with a describing name, i.e. NewEntityAdded):
```
Add-Migration -Project Customer.Project.Data.Migrations -StartUpProject Customer.Project.Data.Migrations -Context ProjectContext -Name TODO
```
- Execute this command from Package Manager console.

### unit tests

- When you created your Domain Entity, a Unit test class with some tests was also created in the [Customer.Project].Domain.Tests project, along with a builder to create a test Entity.
- Try to run these tests.
- Feel free to add more tests.

### integration tests

- When you created your Controller, an integration test class with some tests was also created in the [Customer.Project].Api.Tests project.
- Try to run these tests.
- Feel free to add more tests.

## 3. Angular Building Blocks

Ton install the Entry Angular Building Blocks:
- Using Visual Studio Code, navigate to the root of the Angular project (customer-project-app), open the terminal window and run `npm install` to install all npm packages, including all Enigmatry Angular Building Blocks.

## 4. nswag

- Start the API project from Visual Studio. Make sure that the Swagger API documentation is generated: http://localhost:9999/swagger/v1/swagger.json (9999 is used as an example port number here).
- Navigate in your teminal to the root of the frontend app.
- Run the nswag code generator:
```
npm run nswag
```

## 5. Configure and run the Code Generation

### Configure code generation in Customer.Project.CodeGeneration.Setup: 

- Now we are going to create Configuration for the Code Generator. This code generator will generate Angular/Typescript code based on our features.

### 5.1 Table component configuration

- The first component we will configure is for displaying a list of items in a table.
	- Begin by creating a new folder within the [Customer.Projects].CodeGeneration.Setup project for your feature (use the pluralised name, i.e. Dogs).
  - Right-click the folder, select `Add -> New from template -> Blueprint Code Generation List Configuration`. Give it a name like Get[MyEntities]ComponentConfiguration.
  - When the file is opened, you should fill in the placeholders (press tab to cycle through them):
  	- Request Name (i.e. GetDogs)
    - Component Name (i.e. DogsList)
    - Feature Name (i.e. Dogs)
  - You have now created a basic Configuration for generating an Angular Table component for displaying a list of your Entity.
  - The documentation inside this file explains how you can expand on this basic setup. Feel free to experiment.
  
### 5.2 Form component configuration  

- Let's also configure a component for editing our items.
  - Navigate to the folder Features/Validations inside the Api project. Copy the existing `ProductEditComponentValidationConfiguration` and change the name to match your entity.
  Also change the Response dto in the Type param. I.e: `DogEditComponentValidationConfiguration : ValidationConfiguration<GetDogDetails.Response>`
  - Now you can create validations for your specific type. You can look at the existing validations in the file you copied for inspiration.
  - Now, for the configuration of the form itself, right-click the folder you created when configuring the table/list inside the CodeGeneration.Setup project.
 	- Select `Add -> New from template -> Blueprint Code Generation Form Configuration`. Give it a name like [MyEntities]ComponentConfiguration.
 	- When the file is opened, you should fill in the placeholders (press tab to cycle through them):
  		- Feature Name (i.e. Dogs)
      - Get Details Request Name (i.e. GetDogs)
      - Component Name (i.e. EditDogs. Take care: this should correspond with the name of the Validation configuration) 
  	- You have now created a basic Configuration for generating an Angular Form component for editing an instance of your Entity.
  	- The documentation inside this file explains how you can expand on this basic setup. Feel free to experiment.
    
    
### 5.3 TODO: details screen.

### 5.4 Run the enigmatry code generator

Before you run the code generator, don't forget to save and build your configurations you created in the previous steps.
To generate the angular/typescript code for your configured component, you should run the Enigmatry Code Generator. Replace with the path and name/namespace of your project:

```bash
entry-codegen --source-assembly .\Customer.Project.CodeGeneration.Setup\bin\Debug\net5.0\Customer.Project.CodeGeneration.Setup.dll --destination-directory .\customer-project-app\src\app\features
```
This will add a module and a component to the existing Angular project.
The generated Angular components make use of the shared @enigmatry npm packages. Those are already in the package.json and running `npm install` will install them. 
  
## 6. More information
For more information about the Vertical Slice Architecture, combined with Mediatr and AutoMapper, as used in the Entry Blueprint, you can watch this video by Jimmy Bogard:
- https://www.youtube.com/watch?v=SUiWfhAhgQw


