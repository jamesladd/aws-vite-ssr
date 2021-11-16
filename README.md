# Vite SSR App rendered using AWS Lambda

This template demonstrates a Vite Server Side Rendered App being rendered using AWS Lambda, and served via Cloudfront.

## Getting Started

It is assumed you have an Amazon Web Services (AWS) account and have setup the credentials (.aws/config & .aws/credentials).

It is recommended that you have previously registered a domain name with Route53 and requested an SSL certificate with AWS Certificate Manager.

*Pro-tip*: When getting a Certificate don't forget to register a wildcard domain as well. ie: *.myawesomedomain.com

Install required components
```
yarn install
```

Edit *env.yml* to reflect your requirements. For example the domain name.

Setup the domain
```
yarn create_domain
```
***Note** this process can take a while*

Deploy the Server Side Rendered (SSR) application
```
yarn deploy
```
Open your browser to https://yourdomain and you should see your Server Side Rendered application.
**This is NOT cached.**

Open the AWS Console and go to the CloudFront tool.

In the list of Distributions there should be a new entry for your project.
Copy the domain name and then open your browser to https://value_from_cloudfront

You should see your Server Side Rendered application.
**This IS cached.**

If you want to make the cached version live then you need to change the entry in Route53 to route your Domain name to the
Cloudfront distribution. 

***Sorry for the manual steps but I couldn't find an automated way to do these steps.***

#### Steps to setup Cloudfront Distribution Certificate and Domain names

Goto Cloudfront and select your new distribution.

On the 'General' tab select Edit.

In the 'Alternate domain name (CNAME) - optional' area add your domain name.

It is suggested you also add a wildcard version, eg: *.myawesomedomain.com

In the 'Custom SSL certificate - optional' field select the Certificate associated with your domain.

Click 'Save changes'

It can take a while for Cloudfront to re-deploy.


#### Steps to Route to Cached version

Goto Route53 and select the hosted zone for your domain.

Click on the checkbox next to your domain name and select 'Edit Record'. 
Then select from the values there on the right.

You want to change the 'Alias to API Gateway API' to 'Alias to Cloudfront distribution'.

In the 'Choose distribnution' field select your distribution. If it isnt shown you can enter the value manually.

Click 'Save'

Do both the 'A' and 'AAAA' records.

Now if you open your browser and goto your domain name your CACHED Ssr application should be shown.
