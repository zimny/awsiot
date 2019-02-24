# AWS IoT Core - task
## prerequisits
node LTS
AWS account
AWS CLI credentials

1. checkout project
```bash
git clone ... && cd project
```
2. generate keys and certificate
```bash
aws iot create-keys-and-certificate \
--set-as-active \
--certificate-pem-outfile cert.crt \
--public-key-outfile public.pem.key \
--private-key-outfile private.pem.key \
--region eu-west-1 \
--profile private-default
```
3. register a thing type

    1. Go to AWS console
    2. Select Ireland region
    3. Go to IoT Core
    4. Manage
    5. Types
    6. Create a thing type
        * Name: AGD
    7. Add another searchable thing attributes
        * Attribute key: producent
    8. Create thing type
4. Create policy

    1. Secure
    2. Policies
    3. Create
        * Name: `IoTFullAccess`
        * Action: `iot:*`
        * Resource ARN: `*`
        * Effect: `Allow`
        * Create
5. Attach policy to certificate
    
    1. Secure
    2. Certificates
    3. (...)
    4. Attach policy
    5. Select IoTFullAccess
    6. Attach
6. Create a thing

    1. Manage
    2. Things
    3. Create
    4. Create a single thing
        * Name: `Czajnik`
        * Thing type: `AGD`
        * producent: `amica`
        * Next
        * Create thing without certificate
7. Attach certificate to a thing
    
    1. Secure
    2. Certificates
    3. (...)
    4. Attach thing
        * czajnik
    5. Attach

8. Install project dependencies with 
```bash
npm install
```
9. Update clientId from settings and Endpoint url in `index.js`
10. Run program with
```bash
node index.js
```
11. Type `on`, `off` or `status` to play with device shadow state. Confirm each command with `enter`

12. Set Action based on a rule
    1. Act
    2. Create a rule
        * Name: `turnedOn`
        * Query: `select * from '$aws/things/czajnik/shadow/update/accepted'`
        * Actions: `Republish`
        * Topic: `AGD`
        * Add action
        * Create Rule
13. Update clientId from settings and Endpoint url in `thing.js`
14. Turn on `thing.js` in new terminal window with
```bash
node thing.js
```
15. Navigate to `shadow` program (previous terminal window)
16. Type `on` and enter
17. To vetify if thing was notified with shadow update navigate to thing.js terminal and check if message is visible.


        


