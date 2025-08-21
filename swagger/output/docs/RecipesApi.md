# RecipesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**recipeControllerCreateRecipe**](#recipecontrollercreaterecipe) | **POST** /recipe | Create recipe|
|[**recipeControllerGetRecipeDetails**](#recipecontrollergetrecipedetails) | **GET** /recipe/{id} | Get recipe by Id|
|[**recipeControllerGetRecipes**](#recipecontrollergetrecipes) | **GET** /recipe | Get recipes|
|[**recipeControllerRemoveRecipe**](#recipecontrollerremoverecipe) | **DELETE** /recipe/{id} | Delete recipe|
|[**recipeControllerUpdateRecipe**](#recipecontrollerupdaterecipe) | **PATCH** /recipe/{id} | Edit recipe|

# **recipeControllerCreateRecipe**
> RecipeResponseDto recipeControllerCreateRecipe(createRecipeDto)


### Example

```typescript
import {
    RecipesApi,
    Configuration,
    CreateRecipeDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipesApi(configuration);

let createRecipeDto: CreateRecipeDto; //

const { status, data } = await apiInstance.recipeControllerCreateRecipe(
    createRecipeDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRecipeDto** | **CreateRecipeDto**|  | |


### Return type

**RecipeResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Recipe created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **recipeControllerGetRecipeDetails**
> RecipeResponseDto recipeControllerGetRecipeDetails()


### Example

```typescript
import {
    RecipesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipesApi(configuration);

let id: string; // (default to undefined)
let id2: any; // (default to undefined)

const { status, data } = await apiInstance.recipeControllerGetRecipeDetails(
    id,
    id2
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|
| **id2** | **any** |  | defaults to undefined|


### Return type

**RecipeResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get recipe by Id |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **recipeControllerGetRecipes**
> Array<RecipeResponseDto> recipeControllerGetRecipes()


### Example

```typescript
import {
    RecipesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipesApi(configuration);

let name: string; // (default to undefined)
let id: any; // (default to undefined)

const { status, data } = await apiInstance.recipeControllerGetRecipes(
    name,
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] |  | defaults to undefined|
| **id** | **any** |  | defaults to undefined|


### Return type

**Array<RecipeResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get recipes |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **recipeControllerRemoveRecipe**
> recipeControllerRemoveRecipe()


### Example

```typescript
import {
    RecipesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipesApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.recipeControllerRemoveRecipe(
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
|**204** | Recipe deleted. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **recipeControllerUpdateRecipe**
> recipeControllerUpdateRecipe(updateRecipeDto)


### Example

```typescript
import {
    RecipesApi,
    Configuration,
    UpdateRecipeDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RecipesApi(configuration);

let id: string; // (default to undefined)
let updateRecipeDto: UpdateRecipeDto; //

const { status, data } = await apiInstance.recipeControllerUpdateRecipe(
    id,
    updateRecipeDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateRecipeDto** | **UpdateRecipeDto**|  | |
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
|**204** | Recipe edited. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

