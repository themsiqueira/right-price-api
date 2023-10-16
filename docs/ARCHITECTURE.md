# ARCHITECTURE

The architecture was based on Clean Architecture, of course we are not purist, and do not follow all principals mentioned in the book, but important concepts to the project are, use cases, inputs and outputs (boundaries), and all internal layers, entities, services, validators.

## Domain vs Infra

The Rest, Cli, GRPC or any other way to access our uses cases, should not impact our domain. Anything about the rest, should not impact ou be mentioned inside a use case, that's way we can decouple domain logic, from domain application. This can help us to avoid put cache rules (application logic) inside of domain logic.

## Modules

The project is split in bounded contexts or modules if you prefer, and each bound contexts should create a limit between modules to avoid put all layers in the same context.

## Inputs

The inputs (also know as DTO) are the contract to the use case, should be passed by param, and each input can be transformed into a domain object, this means that if you need create a emporium you can pass as param a CreateEmporiumInput, and this input will be, validated and mapped (by a Mapper) to a emporium entity, this mapper it's coupled to the specific input, and should return a valid entity to this context, or use case (Emporium Create).

## Mappers

The mappers should convert a input into a domain object or entity, this layer exits because the input that we receive many times it's different from the entity, and where we should put this logic? That's why this layer exits abstract the logic of entity creation.

## Validators

The validators in many cases for the input will be enough but also it's necessary to validate entities by context.

## Outputs

The outputs are the contract of what the use case will return. This layer exist because the same entity can have different outputs by context, partial for lists, full to retrieve, this happens to avoid deliver more data then necessary or to even combine more data.

All outputs also should have a mapper, but for the output, we do the reverse we map from domain object or entity, to a output (DTO)
