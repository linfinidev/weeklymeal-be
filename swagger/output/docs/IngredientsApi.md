# IngredientsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**ingredientControllerCreateIngredient**](#ingredientcontrollercreateingredient) | **POST** /ingredient | Create ingredient|
|[**ingredientControllerGetIngredients**](#ingredientcontrollergetingredients) | **GET** /ingredient | Get ingredients|
|[**ingredientControllerRemoveIngredient**](#ingredientcontrollerremoveingredient) | **DELETE** /ingredient/{id} | Delete ingredient|
|[**ingredientControllerUpdateIngredient**](#ingredientcontrollerupdateingredient) | **PUT** /ingredient/{id} | Edit ingredient|

# **ingredientControllerCreateIngredient**
> IngredientResponseDto ingredientControllerCreateIngredient(createIngredientDto)


### Example

```typescript
import {
    IngredientsApi,
    Configuration,
    CreateIngredientDto
} from './api';

const configuration = new Configuration();
const apiInstance = new IngredientsApi(configuration);

let createIngredientDto: CreateIngredientDto; //

const { status, data } = await apiInstance.ingredientControllerCreateIngredient(
    createIngredientDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createIngredientDto** | **CreateIngredientDto**|  | |


### Return type

**IngredientResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Ingredient created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ingredientControllerGetIngredients**
> Array<IngredientResponseDto> ingredientControllerGetIngredients()


### Example

```typescript
import {
    IngredientsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IngredientsApi(configuration);

let name: string; // (default to undefined)

const { status, data } = await apiInstance.ingredientControllerGetIngredients(
    name
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] |  | defaults to undefined|


### Return type

**Array<IngredientResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get all ingredients |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ingredientControllerRemoveIngredient**
> ingredientControllerRemoveIngredient()


### Example

```typescript
import {
    IngredientsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IngredientsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.ingredientControllerRemoveIngredient(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**204** | Ingrediennt deleted. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ingredientControllerUpdateIngredient**
> ingredientControllerUpdateIngredient(updateIngredientDto)


### Example

```typescript
import {
    IngredientsApi,
    Configuration,
    UpdateIngredientDto
} from './api';

const configuration = new Configuration();
const apiInstance = new IngredientsApi(configuration);

let id: string; // (default to undefined)
let updateIngredientDto: UpdateIngredientDto; //

const { status, data } = await apiInstance.ingredientControllerUpdateIngredient(
    id,
    updateIngredientDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateIngredientDto** | **UpdateIngredientDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**204** | Ingredient edited. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

