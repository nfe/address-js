address-js
===========

EN - Javascript library to search for Brazilian Addresses, Cities and States.
PT - Biblioteca javascript para consulta de Endereços, Cidades e Estados

[![Build Status](https://secure.travis-ci.org/nfeio/address-js.png?branch=master)](https://travis-ci.org/nfeio/address-js.svg)


# Library

This library is a wrapper for the `nfe.io` API to allow easy access to use it.

## Usage

TODO (for now, [check the code](https://github.com/nfeio/address-js/blob/master/lib/address-client.js))

# API

The `nfe.io` API allows to find information about Brazilian addresses.

## Authentication

To use the API, your have to create an account in [NFe.io](http://app.nfe.io/login) and use your API key.

It is a Base64 encoded key that should be passed in the Authorization header as below:
`Authorization: Basic your_api_key`

For testing purposes, you can use the following key:
`b58801a82418463f961cff952b27baaa`




## Endpoints

### `GET /states/`

Return all Brazilian states with `code`, `name` and `abbreviation`.

#### Example

```
curl http://open.nfe.io/v1/states -H "Authorization: Basic b58801a82418463f961cff952b27baaa"
```

The response will be like:

```
[
   {
      "code": "12",
      "abbreviation": "AC",
      "name": "Acre"
   },
   {
      "code": "27",
      "abbreviation": "AL",
      "name": "Alagoas"
   },
   ...
   {
      "code": "33",
      "abbreviation": "RJ",
      "name": "Rio de Janeiro"
   },
   ...
   {
      "code": "35",
      "abbreviation": "SP",
      "name": "São Paulo"
   },
   {
      "code": "17",
      "abbreviation": "TO",
      "name": "Tocantins"
   }
]
```

### `GET /states/:state_abbreviation/cities`

Return all cities that belong to a state.

#### Example

Let's say we want to list all cities in the state of *São Paulo* (abbreviation SP)

```
curl http://open.nfe.io/v1/states/SP/cities -H "Authorization: Basic b58801a82418463f961cff952b27baaa"
```

The response will be like:

```
[
   {
      "code": "3500105",
      "name": "Adamantina"
   },
   ...
   {
      "code": "3550308",
      "name": "São Paulo"
   },
   ...
   {
      "code": "3556701",
      "name": "Vinhedo"
   },
   ...
]
```


### `GET /addresses/:postal_code`

### Example

Let's say that we have a brazilian postal code (01310-200) and we need to find which city, state and street it represents.

```
curl http://open.nfe.io/v1/addresses/01310200 -H "Authorization: Basic b58801a82418463f961cff952b27baaa"
```

The response will be:

```
{
   "postalCode": "01310-200",
   "streetSuffix": "Avenida",
   "street": "Paulista",
   "district": "Bela Vista",
   "city": {
      "code": "3550308",
      "name": "São Paulo"
   },
   "state": {
      "code": "35",
      "abbreviation": "SP",
      "name": "São Paulo"
   }
}
```
