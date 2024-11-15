/* tslint:disable */
/* eslint-disable */
/**
 * DressMe API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * Article response
 * @export
 * @interface ArticleResponse
 */
export interface ArticleResponse {
    /**
     * The article name
     * @type {string}
     * @memberof ArticleResponse
     */
    name: string;
    /**
     * The article key
     * @type {string}
     * @memberof ArticleResponse
     */
    key: string;
    /**
     * The article photo url
     * @type {string}
     * @memberof ArticleResponse
     */
    photoUrl: string;
    /**
     * The article category
     * @type {string}
     * @memberof ArticleResponse
     */
    category: string;
    /**
     * The article color
     * @type {string}
     * @memberof ArticleResponse
     */
    color: string;
    /**
     * The article season
     * @type {string}
     * @memberof ArticleResponse
     */
    season: string;
    /**
     * The article climatologies
     * @type {Array<string>}
     * @memberof ArticleResponse
     */
    climatologies: Array<string>;
}

/**
 * Check if a given object implements the ArticleResponse interface.
 */
export function instanceOfArticleResponse(value: object): value is ArticleResponse {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('key' in value) || value['key'] === undefined) return false;
    if (!('photoUrl' in value) || value['photoUrl'] === undefined) return false;
    if (!('category' in value) || value['category'] === undefined) return false;
    if (!('color' in value) || value['color'] === undefined) return false;
    if (!('season' in value) || value['season'] === undefined) return false;
    if (!('climatologies' in value) || value['climatologies'] === undefined) return false;
    return true;
}

export function ArticleResponseFromJSON(json: any): ArticleResponse {
    return ArticleResponseFromJSONTyped(json, false);
}

export function ArticleResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ArticleResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'key': json['key'],
        'photoUrl': json['photoUrl'],
        'category': json['category'],
        'color': json['color'],
        'season': json['season'],
        'climatologies': json['climatologies'],
    };
}

  export function ArticleResponseToJSON(json: any): ArticleResponse {
      return ArticleResponseToJSONTyped(json, false);
  }

  export function ArticleResponseToJSONTyped(value?: ArticleResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'key': value['key'],
        'photoUrl': value['photoUrl'],
        'category': value['category'],
        'color': value['color'],
        'season': value['season'],
        'climatologies': value['climatologies'],
    };
}

