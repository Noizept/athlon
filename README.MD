## 1. JS file is related to JS question

## 2.

* IoT devices that collect data and that need to send the data to a server (assuming we can program them but we have to choose the communication protocol).
* A set/pipeline of business logic layers that process the data collected from the IoT devices, different pieces of this logic require different transformation of the data where a level of computations and/or aggregation may occur.
* The output of these transformations and calculations should be visualised in a web dashboard as lists, charts, etc.
* A level of user management and permissions would be required. For simplicity let’s assume 3 levels of users (please don’t focus on this too much - it’s just for reference)

Ok. Will try to be be brief on this one, lets assume this might have huge traffic and is going be a complex system as u said :D

Lets think like this... IoT devices are not always connected to WiFi therefore sometimes bandwith might be a problem....
* Using a backend service using gRPC would reduce bandwith and increase performance (ive seen some comparassions on this) on message transfer, i would suggest we set up gRPC server with any language we want (go,node,etc) and plug it in with the client. (Other option could be store all this as events in a CQRS+Event Sourcing using kafka kind of system and work from there...)

* Once we get the message on the lets call "grpc  server reciever " we could think in what kind of trasnformations we need. Depending on this communitcation with between microservices is easy using grpc too and we could even reeuse the ioT devices protobufers declareations for this.
* Im not sure what kind of transformations here and therefore microservices/services needed from here (ive read about apache spark about computation heavy stuff but just a brief overview)
* Preparing the data to be accessed we could think about a Read Model database (same concept as CQRS) If there is alot of accesses to only new resources and not so much to old ones, and theres alot of traffic from the WebUI we can discuss in adding a cache such as Redis or memcache before hitting the database itself.
* We could then use ResAPI / graphQL + frontend framework (or wtv we dedice) to build our Web UI.

* The users If we want them to register with us, we need to think about auth and authorization too, if they register using 3rd parties such as Oath google etc we just worry about Authorization and we dont worry about encryption and all that annoying stuff.

I tried to give a brief overview/idea of what could be explored. Maybe combining both approaches depending on what kind of system. Should be a good starting point for discussion
