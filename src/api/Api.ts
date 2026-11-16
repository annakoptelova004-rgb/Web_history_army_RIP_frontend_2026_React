/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface InternalAppHandlerLoginRequest {
  /** @example "anna_lab4" */
  login?: string;
  /** @example "Lab4Test2026!" */
  password?: string;
}

export interface InternalAppHandlerMilitaryBranchSerializer {
  created_at?: string;
  creator_id?: number;
  description?: string;
  food?: number;
  formed_at?: string;
  id?: number;
  image?: string;
  is_creator?: number;
  liked?: number;
  name?: string;
  speed_plain?: number;
  video?: string;
}

export interface InternalAppHandlerRegisterUserRequest {
  /** @example "anna_new" */
  login?: string;
  /** @example "Password123" */
  password?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8081",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Army March API
 * @version 1.0
 * @baseUrl http://localhost:8081
 * @contact
 *
 * API проекта «Армейский марш».
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Проверяет логин и пароль и возвращает JWT-токен.
     *
     * @tags auth
     * @name LoginCreate
     * @summary Вход пользователя
     * @request POST:/api/login
     */
    loginCreate: (
      request: InternalAppHandlerLoginRequest,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/login`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Отзывает текущий JWT-токен через Redis.
     *
     * @tags auth
     * @name LogoutCreate
     * @summary Выход пользователя
     * @request POST:/api/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/logout`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает список военных веток. Можно фильтровать по скорости.
     *
     * @tags military_branches
     * @name MilitaryBranchesList
     * @summary Получить список военных веток
     * @request GET:/api/military_branches
     */
    militaryBranchesList: (
      query?: {
        /** Скорость передвижения */
        speed?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InternalAppHandlerMilitaryBranchSerializer[],
        Record<string, any>
      >({
        path: `/api/military_branches`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Создаёт черновик и при необходимости загружает изображение и видео.
     *
     * @tags military_branches
     * @name MilitaryBranchesCreate
     * @summary Создать черновик военной ветки
     * @request POST:/api/military_branches
     * @secure
     */
    militaryBranchesCreate: (
      data: {
        /** Название военной ветки */
        name: string;
        /**
         * Изображение
         * @format binary
         */
        image?: File;
        /**
         * Видео
         * @format binary
         */
        video?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/military_branches`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags military_branches
     * @name MilitaryBranchesDraftList
     * @summary Получить свой черновик
     * @request GET:/api/military_branches/draft
     * @secure
     */
    militaryBranchesDraftList: (params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/military_branches/draft`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags military_branches
     * @name MilitaryBranchesFeedList
     * @summary Получить ленту военных веток
     * @request GET:/api/military_branches/feed
     * @secure
     */
    militaryBranchesFeedList: (params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/military_branches/feed`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает одну военную ветку. При next=true возвращает следующую.
     *
     * @tags military_branches
     * @name MilitaryBranchesDetail
     * @summary Получить военную ветку по ID
     * @request GET:/api/military_branches/{id}
     */
    militaryBranchesDetail: (
      id: number,
      query?: {
        /** Получить следующую ветку */
        next?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/military_branches/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Публикует черновик текущего пользователя.
     *
     * @tags military_branches
     * @name MilitaryBranchesUpdate
     * @summary Опубликовать военную ветку
     * @request PUT:/api/military_branches/{id}
     * @secure
     */
    militaryBranchesUpdate: (
      id: number,
      data: {
        /** Описание военной ветки */
        description?: string;
        /** Скорость на равнине, км/день */
        speed_plain: number;
        /** Питание, кг/день */
        food: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/military_branches/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет доступную текущему пользователю запись.
     *
     * @tags military_branches
     * @name MilitaryBranchesDelete
     * @summary Удалить военную ветку
     * @request DELETE:/api/military_branches/{id}
     * @secure
     */
    militaryBranchesDelete: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/military_branches/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Параметр like=0 отменяет лайк.
     *
     * @tags military_branches
     * @name MilitaryBranchesLikeCreate
     * @summary Поставить или отменить лайк
     * @request POST:/api/military_branches/{id}/like
     * @secure
     */
    militaryBranchesLikeCreate: (
      id: number,
      query?: {
        /** 0 — отменить лайк */
        like?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/military_branches/${id}/like`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Создаёт пользователя с уникальным логином и паролем не короче 8 символов.
     *
     * @tags auth
     * @name UsersCreate
     * @summary Регистрация пользователя
     * @request POST:/api/users
     */
    usersCreate: (
      request: InternalAppHandlerRegisterUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/users`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
