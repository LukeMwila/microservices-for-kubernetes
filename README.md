# Deploying Microservices to Amazon EKS
This repository contains application source code for microservices, Kubernetes manifests, and application Helm charts that can be deployed to a Kubernetes cluster. 

![Alt text](./images/deploy-microservices-to-eks.png?raw=true "Deploy Microservices to Amazon EKS diagram")

## About the Microservices
The applications used for demonstrative purposes are `Orders` and `Products`. The applications are written in JavaScript (NodeJS based APIs). The Orders API returns a list of orders, whereas the products API returns a list of products.

## Microservices
The application source code for the microservices is in the `microservices` folder.

### Orders API
![Alt text](./images/orders-code-screenshot.png?raw=true "Orders Source Code")

### Products API
![Alt text](./images/products-code-screenshot.png?raw=true "Products Source Code")

### Endpoints for Microservices
When running the microservices locally or in your Amazon EKS cluster, you can use the following API endpoints for testing purposes.

#### Orders 
```
GET Orders - /v1/orders
GET Orders and Products - /v1/orders/products
``` 

#### Products
``` 
GET Products - /v1/products
``` 

### Container Image Repositories

#### Orders 
Repository: public.ecr.aws/k3d0y0m9/ecommerce/orders
<br />Image tag: "0.0.1"

#### Products
Repository: public.ecr.aws/k3d0y0m9/ecommerce/products
<br />Image tag: "0.0.1"

## Raw Manifests

The `raw-manifests` folder contains the Kubernetes manifests for both microservices. These files can be used to deploy the applications to a Kubernetes cluster. In order to expose these applications to external traffic, you should first install the [Load Balancer Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/) and then deploy the Ingress resource (`ingress.yaml`). Alternatively, you can update the `Services` from a `ClusterIP` to `LoadBalancer`. 

*It's a best practice to use an Ingress controller like the Load Balancer Controller to expose your applications to external traffic.*

```
.
|-- deployments.png
|-- ingress.yaml
|-- orders-deployment.yaml
|-- orders-service.yaml
|-- orders.yaml
|-- products-deployment.yaml
|-- products-service.yaml
|-- products.yaml
`-- service.png
```

Example:
```
cd ./raw-manifests
kubectl apply -f ingress.yaml,service.yaml,deployment.yaml
```

## Helm Charts

The `helm` folder contains the Helm charts for both microservices. Helm is a package manager for Kubernetes resources. Instead of managing multiple Kubernetes manifests, you can use Helm to manage the deployment lifecycle for your Kubernetes applications. It also has a templating engine to automatically generate the relevant resources for a given application.

```
.
|-- orders
|   |-- Chart.yaml
|   |-- charts
|   |-- orders.yaml
|   |-- templates
|   |   |-- NOTES.txt
|   |   |-- _helpers.tpl
|   |   |-- deployment.yaml
|   |   |-- hpa.yaml
|   |   |-- ingress.yaml
|   |   |-- service.yaml
|   |   |-- serviceaccount.yaml
|   |   `-- tests
|   `-- values.yaml
`-- products
    |-- Chart.yaml
    |-- charts
    |-- templates
    |   |-- NOTES.txt
    |   |-- _helpers.tpl
    |   |-- deployment.yaml
    |   |-- hpa.yaml
    |   |-- ingress.yaml
    |   |-- service.yaml
    |   |-- serviceaccount.yaml
    |   `-- tests
    `-- values.yaml
```

Example:
```
cd ./helm/orders
helm install -f values.yaml orders .
```

## Stateful Application

```
.
|-- service.yaml
|-- statefulset.png
`-- statefulset.yaml
```

## GitHub Actions Deployment Config
The `.github/workflows` folder contains the *main.yaml* configuration file the is used to configure the build and deployment process in GitHub Actions.

*Important note: Remember to create/add the relevant secrets (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, EKS_CLUSTER, EKS_REGION) for your GitHub Actions deployment process.*

```
.
`-- workflows
    `-- main.yaml
```