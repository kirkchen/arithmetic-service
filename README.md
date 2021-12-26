# Work assignment - arithmetic service

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/kirkchen/arithmetic-service)

## Brief
Our game designer has decided that kids should be able to calculate arithmetic in the Toca Life: World app. 

Sadly, there’s no available game developer to do it on the client side, so you’ve been tasked to write a new microservice that handles math expressions.

It will be a service deployed internally in our VPC, so there’s no need to handle users or authentication etc. 
Our API gateway will handle the input from the clients, and forward it to your service.

Internally, we’ve settled on TypeScript-based [NestJS](https://nestjs.com) services. 
This is a skeleton project that you can extend to implement the microservice functionality. 

Use any NestJS functionality you see fit, but to get you started, here's a couple of pointers: 
* `AppController` is wired for the only route `/`
* `CalculatorService` can be used for the arithmetic implementation, and is already configured as a [Provider](https://docs.nestjs.com/providers) in the `AppModule`
* Paths and other NestJS plumbing is mostly configured with decorators.

## Requirements:
* It should calculate arithmetic expressions
* Handle the basic operations, +, -, * and /
* Grouping with parenthesis
 
### Input:
The expression will be in the path segment of the URL

### Output:
Return the result in the HTTP response, two decimal precision is enough.

#### Example data

```
> curl localhost:3000/3+5
8
```
```
> curl localhost:3000/(3+5)/(4-2)
4
```
```
> curl localhost:3000/(5*(3+1)-2)*(3+1)
72
```

## Submission
A runnable web server with a framework you’re comfortable with. The implementation should be in TypeScript.
Please submit the app by providing us with a git repository that we can clone, build and run.

## Things to consider
* How should this be tested?
* Is your implementation easy to understand?
* How can it be extended to add more operators, or unary operators?
* If a game designer would like to save a history of calculated expressions, how would you do that?
