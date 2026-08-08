
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Affiliate
 * 
 */
export type Affiliate = $Result.DefaultSelection<Prisma.$AffiliatePayload>
/**
 * Model Payout
 * 
 */
export type Payout = $Result.DefaultSelection<Prisma.$PayoutPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model AffiliateReferral
 * 
 */
export type AffiliateReferral = $Result.DefaultSelection<Prisma.$AffiliateReferralPayload>
/**
 * Model OtpCode
 * 
 */
export type OtpCode = $Result.DefaultSelection<Prisma.$OtpCodePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.affiliate`: Exposes CRUD operations for the **Affiliate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Affiliates
    * const affiliates = await prisma.affiliate.findMany()
    * ```
    */
  get affiliate(): Prisma.AffiliateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payout`: Exposes CRUD operations for the **Payout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payouts
    * const payouts = await prisma.payout.findMany()
    * ```
    */
  get payout(): Prisma.PayoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.affiliateReferral`: Exposes CRUD operations for the **AffiliateReferral** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AffiliateReferrals
    * const affiliateReferrals = await prisma.affiliateReferral.findMany()
    * ```
    */
  get affiliateReferral(): Prisma.AffiliateReferralDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otpCode`: Exposes CRUD operations for the **OtpCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtpCodes
    * const otpCodes = await prisma.otpCode.findMany()
    * ```
    */
  get otpCode(): Prisma.OtpCodeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Affiliate: 'Affiliate',
    Payout: 'Payout',
    Product: 'Product',
    Order: 'Order',
    OrderItem: 'OrderItem',
    AffiliateReferral: 'AffiliateReferral',
    OtpCode: 'OtpCode'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "affiliate" | "payout" | "product" | "order" | "orderItem" | "affiliateReferral" | "otpCode"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Affiliate: {
        payload: Prisma.$AffiliatePayload<ExtArgs>
        fields: Prisma.AffiliateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffiliateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffiliateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePayload>
          }
          findFirst: {
            args: Prisma.AffiliateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffiliateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePayload>
          }
          findMany: {
            args: Prisma.AffiliateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePayload>[]
          }
          create: {
            args: Prisma.AffiliateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePayload>
          }
          createMany: {
            args: Prisma.AffiliateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffiliateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePayload>[]
          }
          delete: {
            args: Prisma.AffiliateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePayload>
          }
          update: {
            args: Prisma.AffiliateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePayload>
          }
          deleteMany: {
            args: Prisma.AffiliateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffiliateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AffiliateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePayload>[]
          }
          upsert: {
            args: Prisma.AffiliateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliatePayload>
          }
          aggregate: {
            args: Prisma.AffiliateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffiliate>
          }
          groupBy: {
            args: Prisma.AffiliateGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffiliateGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffiliateCountArgs<ExtArgs>
            result: $Utils.Optional<AffiliateCountAggregateOutputType> | number
          }
        }
      }
      Payout: {
        payload: Prisma.$PayoutPayload<ExtArgs>
        fields: Prisma.PayoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          findFirst: {
            args: Prisma.PayoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          findMany: {
            args: Prisma.PayoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          create: {
            args: Prisma.PayoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          createMany: {
            args: Prisma.PayoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          delete: {
            args: Prisma.PayoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          update: {
            args: Prisma.PayoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          deleteMany: {
            args: Prisma.PayoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PayoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          upsert: {
            args: Prisma.PayoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          aggregate: {
            args: Prisma.PayoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayout>
          }
          groupBy: {
            args: Prisma.PayoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayoutCountArgs<ExtArgs>
            result: $Utils.Optional<PayoutCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      AffiliateReferral: {
        payload: Prisma.$AffiliateReferralPayload<ExtArgs>
        fields: Prisma.AffiliateReferralFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffiliateReferralFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateReferralPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffiliateReferralFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateReferralPayload>
          }
          findFirst: {
            args: Prisma.AffiliateReferralFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateReferralPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffiliateReferralFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateReferralPayload>
          }
          findMany: {
            args: Prisma.AffiliateReferralFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateReferralPayload>[]
          }
          create: {
            args: Prisma.AffiliateReferralCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateReferralPayload>
          }
          createMany: {
            args: Prisma.AffiliateReferralCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffiliateReferralCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateReferralPayload>[]
          }
          delete: {
            args: Prisma.AffiliateReferralDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateReferralPayload>
          }
          update: {
            args: Prisma.AffiliateReferralUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateReferralPayload>
          }
          deleteMany: {
            args: Prisma.AffiliateReferralDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffiliateReferralUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AffiliateReferralUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateReferralPayload>[]
          }
          upsert: {
            args: Prisma.AffiliateReferralUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateReferralPayload>
          }
          aggregate: {
            args: Prisma.AffiliateReferralAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffiliateReferral>
          }
          groupBy: {
            args: Prisma.AffiliateReferralGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffiliateReferralGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffiliateReferralCountArgs<ExtArgs>
            result: $Utils.Optional<AffiliateReferralCountAggregateOutputType> | number
          }
        }
      }
      OtpCode: {
        payload: Prisma.$OtpCodePayload<ExtArgs>
        fields: Prisma.OtpCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          findFirst: {
            args: Prisma.OtpCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          findMany: {
            args: Prisma.OtpCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          create: {
            args: Prisma.OtpCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          createMany: {
            args: Prisma.OtpCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          delete: {
            args: Prisma.OtpCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          update: {
            args: Prisma.OtpCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          deleteMany: {
            args: Prisma.OtpCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          upsert: {
            args: Prisma.OtpCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          aggregate: {
            args: Prisma.OtpCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtpCode>
          }
          groupBy: {
            args: Prisma.OtpCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpCodeCountArgs<ExtArgs>
            result: $Utils.Optional<OtpCodeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    affiliate?: AffiliateOmit
    payout?: PayoutOmit
    product?: ProductOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    affiliateReferral?: AffiliateReferralOmit
    otpCode?: OtpCodeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    orders: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type AffiliateCountOutputType
   */

  export type AffiliateCountOutputType = {
    referrals: number
    orders: number
    payouts: number
  }

  export type AffiliateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    referrals?: boolean | AffiliateCountOutputTypeCountReferralsArgs
    orders?: boolean | AffiliateCountOutputTypeCountOrdersArgs
    payouts?: boolean | AffiliateCountOutputTypeCountPayoutsArgs
  }

  // Custom InputTypes
  /**
   * AffiliateCountOutputType without action
   */
  export type AffiliateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCountOutputType
     */
    select?: AffiliateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AffiliateCountOutputType without action
   */
  export type AffiliateCountOutputTypeCountReferralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateReferralWhereInput
  }

  /**
   * AffiliateCountOutputType without action
   */
  export type AffiliateCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * AffiliateCountOutputType without action
   */
  export type AffiliateCountOutputTypeCountPayoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    order_items: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_items?: boolean | ProductCountOutputTypeCountOrder_itemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrder_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    order_items: number
    referrals: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_items?: boolean | OrderCountOutputTypeCountOrder_itemsArgs
    referrals?: boolean | OrderCountOutputTypeCountReferralsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountOrder_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountReferralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateReferralWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    user_id: number | null
  }

  export type UserSumAggregateOutputType = {
    user_id: number | null
  }

  export type UserMinAggregateOutputType = {
    user_id: number | null
    email: string | null
    password_hash: string | null
    role: string | null
    created_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    user_id: number | null
    email: string | null
    password_hash: string | null
    role: string | null
    created_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    user_id: number
    email: number
    password_hash: number
    role: number
    created_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    user_id?: true
  }

  export type UserSumAggregateInputType = {
    user_id?: true
  }

  export type UserMinAggregateInputType = {
    user_id?: true
    email?: true
    password_hash?: true
    role?: true
    created_at?: true
  }

  export type UserMaxAggregateInputType = {
    user_id?: true
    email?: true
    password_hash?: true
    role?: true
    created_at?: true
  }

  export type UserCountAggregateInputType = {
    user_id?: true
    email?: true
    password_hash?: true
    role?: true
    created_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    user_id: number
    email: string
    password_hash: string
    role: string
    created_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
    affiliates?: boolean | User$affiliatesArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    user_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    created_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "email" | "password_hash" | "role" | "created_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affiliates?: boolean | User$affiliatesArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      affiliates: Prisma.$AffiliatePayload<ExtArgs> | null
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      email: string
      password_hash: string
      role: string
      created_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    affiliates<T extends User$affiliatesArgs<ExtArgs> = {}>(args?: Subset<T, User$affiliatesArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly user_id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.affiliates
   */
  export type User$affiliatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
    where?: AffiliateWhereInput
  }

  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Affiliate
   */

  export type AggregateAffiliate = {
    _count: AffiliateCountAggregateOutputType | null
    _avg: AffiliateAvgAggregateOutputType | null
    _sum: AffiliateSumAggregateOutputType | null
    _min: AffiliateMinAggregateOutputType | null
    _max: AffiliateMaxAggregateOutputType | null
  }

  export type AffiliateAvgAggregateOutputType = {
    affiliate_id: number | null
    user_id: number | null
    commissions_earned: Decimal | null
    available_balance: Decimal | null
    number_of_referrals: number | null
  }

  export type AffiliateSumAggregateOutputType = {
    affiliate_id: number | null
    user_id: number | null
    commissions_earned: Decimal | null
    available_balance: Decimal | null
    number_of_referrals: number | null
  }

  export type AffiliateMinAggregateOutputType = {
    affiliate_id: number | null
    user_id: number | null
    name: string | null
    commissions_earned: Decimal | null
    available_balance: Decimal | null
    number_of_referrals: number | null
    account_status: string | null
    referral_link: string | null
    referral_code: string | null
  }

  export type AffiliateMaxAggregateOutputType = {
    affiliate_id: number | null
    user_id: number | null
    name: string | null
    commissions_earned: Decimal | null
    available_balance: Decimal | null
    number_of_referrals: number | null
    account_status: string | null
    referral_link: string | null
    referral_code: string | null
  }

  export type AffiliateCountAggregateOutputType = {
    affiliate_id: number
    user_id: number
    name: number
    commissions_earned: number
    available_balance: number
    number_of_referrals: number
    account_status: number
    referral_link: number
    referral_code: number
    _all: number
  }


  export type AffiliateAvgAggregateInputType = {
    affiliate_id?: true
    user_id?: true
    commissions_earned?: true
    available_balance?: true
    number_of_referrals?: true
  }

  export type AffiliateSumAggregateInputType = {
    affiliate_id?: true
    user_id?: true
    commissions_earned?: true
    available_balance?: true
    number_of_referrals?: true
  }

  export type AffiliateMinAggregateInputType = {
    affiliate_id?: true
    user_id?: true
    name?: true
    commissions_earned?: true
    available_balance?: true
    number_of_referrals?: true
    account_status?: true
    referral_link?: true
    referral_code?: true
  }

  export type AffiliateMaxAggregateInputType = {
    affiliate_id?: true
    user_id?: true
    name?: true
    commissions_earned?: true
    available_balance?: true
    number_of_referrals?: true
    account_status?: true
    referral_link?: true
    referral_code?: true
  }

  export type AffiliateCountAggregateInputType = {
    affiliate_id?: true
    user_id?: true
    name?: true
    commissions_earned?: true
    available_balance?: true
    number_of_referrals?: true
    account_status?: true
    referral_link?: true
    referral_code?: true
    _all?: true
  }

  export type AffiliateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Affiliate to aggregate.
     */
    where?: AffiliateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affiliates to fetch.
     */
    orderBy?: AffiliateOrderByWithRelationInput | AffiliateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffiliateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affiliates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affiliates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Affiliates
    **/
    _count?: true | AffiliateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AffiliateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AffiliateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffiliateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffiliateMaxAggregateInputType
  }

  export type GetAffiliateAggregateType<T extends AffiliateAggregateArgs> = {
        [P in keyof T & keyof AggregateAffiliate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffiliate[P]>
      : GetScalarType<T[P], AggregateAffiliate[P]>
  }




  export type AffiliateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateWhereInput
    orderBy?: AffiliateOrderByWithAggregationInput | AffiliateOrderByWithAggregationInput[]
    by: AffiliateScalarFieldEnum[] | AffiliateScalarFieldEnum
    having?: AffiliateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffiliateCountAggregateInputType | true
    _avg?: AffiliateAvgAggregateInputType
    _sum?: AffiliateSumAggregateInputType
    _min?: AffiliateMinAggregateInputType
    _max?: AffiliateMaxAggregateInputType
  }

  export type AffiliateGroupByOutputType = {
    affiliate_id: number
    user_id: number
    name: string
    commissions_earned: Decimal
    available_balance: Decimal
    number_of_referrals: number
    account_status: string
    referral_link: string
    referral_code: string
    _count: AffiliateCountAggregateOutputType | null
    _avg: AffiliateAvgAggregateOutputType | null
    _sum: AffiliateSumAggregateOutputType | null
    _min: AffiliateMinAggregateOutputType | null
    _max: AffiliateMaxAggregateOutputType | null
  }

  type GetAffiliateGroupByPayload<T extends AffiliateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffiliateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffiliateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffiliateGroupByOutputType[P]>
            : GetScalarType<T[P], AffiliateGroupByOutputType[P]>
        }
      >
    >


  export type AffiliateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    affiliate_id?: boolean
    user_id?: boolean
    name?: boolean
    commissions_earned?: boolean
    available_balance?: boolean
    number_of_referrals?: boolean
    account_status?: boolean
    referral_link?: boolean
    referral_code?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    referrals?: boolean | Affiliate$referralsArgs<ExtArgs>
    orders?: boolean | Affiliate$ordersArgs<ExtArgs>
    payouts?: boolean | Affiliate$payoutsArgs<ExtArgs>
    _count?: boolean | AffiliateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliate"]>

  export type AffiliateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    affiliate_id?: boolean
    user_id?: boolean
    name?: boolean
    commissions_earned?: boolean
    available_balance?: boolean
    number_of_referrals?: boolean
    account_status?: boolean
    referral_link?: boolean
    referral_code?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliate"]>

  export type AffiliateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    affiliate_id?: boolean
    user_id?: boolean
    name?: boolean
    commissions_earned?: boolean
    available_balance?: boolean
    number_of_referrals?: boolean
    account_status?: boolean
    referral_link?: boolean
    referral_code?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliate"]>

  export type AffiliateSelectScalar = {
    affiliate_id?: boolean
    user_id?: boolean
    name?: boolean
    commissions_earned?: boolean
    available_balance?: boolean
    number_of_referrals?: boolean
    account_status?: boolean
    referral_link?: boolean
    referral_code?: boolean
  }

  export type AffiliateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"affiliate_id" | "user_id" | "name" | "commissions_earned" | "available_balance" | "number_of_referrals" | "account_status" | "referral_link" | "referral_code", ExtArgs["result"]["affiliate"]>
  export type AffiliateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    referrals?: boolean | Affiliate$referralsArgs<ExtArgs>
    orders?: boolean | Affiliate$ordersArgs<ExtArgs>
    payouts?: boolean | Affiliate$payoutsArgs<ExtArgs>
    _count?: boolean | AffiliateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AffiliateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AffiliateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AffiliatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Affiliate"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      referrals: Prisma.$AffiliateReferralPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      payouts: Prisma.$PayoutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      affiliate_id: number
      user_id: number
      name: string
      commissions_earned: Prisma.Decimal
      available_balance: Prisma.Decimal
      number_of_referrals: number
      account_status: string
      referral_link: string
      referral_code: string
    }, ExtArgs["result"]["affiliate"]>
    composites: {}
  }

  type AffiliateGetPayload<S extends boolean | null | undefined | AffiliateDefaultArgs> = $Result.GetResult<Prisma.$AffiliatePayload, S>

  type AffiliateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AffiliateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AffiliateCountAggregateInputType | true
    }

  export interface AffiliateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Affiliate'], meta: { name: 'Affiliate' } }
    /**
     * Find zero or one Affiliate that matches the filter.
     * @param {AffiliateFindUniqueArgs} args - Arguments to find a Affiliate
     * @example
     * // Get one Affiliate
     * const affiliate = await prisma.affiliate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffiliateFindUniqueArgs>(args: SelectSubset<T, AffiliateFindUniqueArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Affiliate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AffiliateFindUniqueOrThrowArgs} args - Arguments to find a Affiliate
     * @example
     * // Get one Affiliate
     * const affiliate = await prisma.affiliate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffiliateFindUniqueOrThrowArgs>(args: SelectSubset<T, AffiliateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Affiliate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateFindFirstArgs} args - Arguments to find a Affiliate
     * @example
     * // Get one Affiliate
     * const affiliate = await prisma.affiliate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffiliateFindFirstArgs>(args?: SelectSubset<T, AffiliateFindFirstArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Affiliate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateFindFirstOrThrowArgs} args - Arguments to find a Affiliate
     * @example
     * // Get one Affiliate
     * const affiliate = await prisma.affiliate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffiliateFindFirstOrThrowArgs>(args?: SelectSubset<T, AffiliateFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Affiliates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Affiliates
     * const affiliates = await prisma.affiliate.findMany()
     * 
     * // Get first 10 Affiliates
     * const affiliates = await prisma.affiliate.findMany({ take: 10 })
     * 
     * // Only select the `affiliate_id`
     * const affiliateWithAffiliate_idOnly = await prisma.affiliate.findMany({ select: { affiliate_id: true } })
     * 
     */
    findMany<T extends AffiliateFindManyArgs>(args?: SelectSubset<T, AffiliateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Affiliate.
     * @param {AffiliateCreateArgs} args - Arguments to create a Affiliate.
     * @example
     * // Create one Affiliate
     * const Affiliate = await prisma.affiliate.create({
     *   data: {
     *     // ... data to create a Affiliate
     *   }
     * })
     * 
     */
    create<T extends AffiliateCreateArgs>(args: SelectSubset<T, AffiliateCreateArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Affiliates.
     * @param {AffiliateCreateManyArgs} args - Arguments to create many Affiliates.
     * @example
     * // Create many Affiliates
     * const affiliate = await prisma.affiliate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffiliateCreateManyArgs>(args?: SelectSubset<T, AffiliateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Affiliates and returns the data saved in the database.
     * @param {AffiliateCreateManyAndReturnArgs} args - Arguments to create many Affiliates.
     * @example
     * // Create many Affiliates
     * const affiliate = await prisma.affiliate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Affiliates and only return the `affiliate_id`
     * const affiliateWithAffiliate_idOnly = await prisma.affiliate.createManyAndReturn({
     *   select: { affiliate_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffiliateCreateManyAndReturnArgs>(args?: SelectSubset<T, AffiliateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Affiliate.
     * @param {AffiliateDeleteArgs} args - Arguments to delete one Affiliate.
     * @example
     * // Delete one Affiliate
     * const Affiliate = await prisma.affiliate.delete({
     *   where: {
     *     // ... filter to delete one Affiliate
     *   }
     * })
     * 
     */
    delete<T extends AffiliateDeleteArgs>(args: SelectSubset<T, AffiliateDeleteArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Affiliate.
     * @param {AffiliateUpdateArgs} args - Arguments to update one Affiliate.
     * @example
     * // Update one Affiliate
     * const affiliate = await prisma.affiliate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffiliateUpdateArgs>(args: SelectSubset<T, AffiliateUpdateArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Affiliates.
     * @param {AffiliateDeleteManyArgs} args - Arguments to filter Affiliates to delete.
     * @example
     * // Delete a few Affiliates
     * const { count } = await prisma.affiliate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffiliateDeleteManyArgs>(args?: SelectSubset<T, AffiliateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Affiliates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Affiliates
     * const affiliate = await prisma.affiliate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffiliateUpdateManyArgs>(args: SelectSubset<T, AffiliateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Affiliates and returns the data updated in the database.
     * @param {AffiliateUpdateManyAndReturnArgs} args - Arguments to update many Affiliates.
     * @example
     * // Update many Affiliates
     * const affiliate = await prisma.affiliate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Affiliates and only return the `affiliate_id`
     * const affiliateWithAffiliate_idOnly = await prisma.affiliate.updateManyAndReturn({
     *   select: { affiliate_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AffiliateUpdateManyAndReturnArgs>(args: SelectSubset<T, AffiliateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Affiliate.
     * @param {AffiliateUpsertArgs} args - Arguments to update or create a Affiliate.
     * @example
     * // Update or create a Affiliate
     * const affiliate = await prisma.affiliate.upsert({
     *   create: {
     *     // ... data to create a Affiliate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Affiliate we want to update
     *   }
     * })
     */
    upsert<T extends AffiliateUpsertArgs>(args: SelectSubset<T, AffiliateUpsertArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Affiliates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCountArgs} args - Arguments to filter Affiliates to count.
     * @example
     * // Count the number of Affiliates
     * const count = await prisma.affiliate.count({
     *   where: {
     *     // ... the filter for the Affiliates we want to count
     *   }
     * })
    **/
    count<T extends AffiliateCountArgs>(
      args?: Subset<T, AffiliateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffiliateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Affiliate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffiliateAggregateArgs>(args: Subset<T, AffiliateAggregateArgs>): Prisma.PrismaPromise<GetAffiliateAggregateType<T>>

    /**
     * Group by Affiliate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffiliateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffiliateGroupByArgs['orderBy'] }
        : { orderBy?: AffiliateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffiliateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffiliateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Affiliate model
   */
  readonly fields: AffiliateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Affiliate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffiliateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    referrals<T extends Affiliate$referralsArgs<ExtArgs> = {}>(args?: Subset<T, Affiliate$referralsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Affiliate$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Affiliate$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payouts<T extends Affiliate$payoutsArgs<ExtArgs> = {}>(args?: Subset<T, Affiliate$payoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Affiliate model
   */
  interface AffiliateFieldRefs {
    readonly affiliate_id: FieldRef<"Affiliate", 'Int'>
    readonly user_id: FieldRef<"Affiliate", 'Int'>
    readonly name: FieldRef<"Affiliate", 'String'>
    readonly commissions_earned: FieldRef<"Affiliate", 'Decimal'>
    readonly available_balance: FieldRef<"Affiliate", 'Decimal'>
    readonly number_of_referrals: FieldRef<"Affiliate", 'Int'>
    readonly account_status: FieldRef<"Affiliate", 'String'>
    readonly referral_link: FieldRef<"Affiliate", 'String'>
    readonly referral_code: FieldRef<"Affiliate", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Affiliate findUnique
   */
  export type AffiliateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
    /**
     * Filter, which Affiliate to fetch.
     */
    where: AffiliateWhereUniqueInput
  }

  /**
   * Affiliate findUniqueOrThrow
   */
  export type AffiliateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
    /**
     * Filter, which Affiliate to fetch.
     */
    where: AffiliateWhereUniqueInput
  }

  /**
   * Affiliate findFirst
   */
  export type AffiliateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
    /**
     * Filter, which Affiliate to fetch.
     */
    where?: AffiliateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affiliates to fetch.
     */
    orderBy?: AffiliateOrderByWithRelationInput | AffiliateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Affiliates.
     */
    cursor?: AffiliateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affiliates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affiliates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Affiliates.
     */
    distinct?: AffiliateScalarFieldEnum | AffiliateScalarFieldEnum[]
  }

  /**
   * Affiliate findFirstOrThrow
   */
  export type AffiliateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
    /**
     * Filter, which Affiliate to fetch.
     */
    where?: AffiliateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affiliates to fetch.
     */
    orderBy?: AffiliateOrderByWithRelationInput | AffiliateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Affiliates.
     */
    cursor?: AffiliateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affiliates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affiliates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Affiliates.
     */
    distinct?: AffiliateScalarFieldEnum | AffiliateScalarFieldEnum[]
  }

  /**
   * Affiliate findMany
   */
  export type AffiliateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
    /**
     * Filter, which Affiliates to fetch.
     */
    where?: AffiliateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affiliates to fetch.
     */
    orderBy?: AffiliateOrderByWithRelationInput | AffiliateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Affiliates.
     */
    cursor?: AffiliateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affiliates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affiliates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Affiliates.
     */
    distinct?: AffiliateScalarFieldEnum | AffiliateScalarFieldEnum[]
  }

  /**
   * Affiliate create
   */
  export type AffiliateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
    /**
     * The data needed to create a Affiliate.
     */
    data: XOR<AffiliateCreateInput, AffiliateUncheckedCreateInput>
  }

  /**
   * Affiliate createMany
   */
  export type AffiliateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Affiliates.
     */
    data: AffiliateCreateManyInput | AffiliateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Affiliate createManyAndReturn
   */
  export type AffiliateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * The data used to create many Affiliates.
     */
    data: AffiliateCreateManyInput | AffiliateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Affiliate update
   */
  export type AffiliateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
    /**
     * The data needed to update a Affiliate.
     */
    data: XOR<AffiliateUpdateInput, AffiliateUncheckedUpdateInput>
    /**
     * Choose, which Affiliate to update.
     */
    where: AffiliateWhereUniqueInput
  }

  /**
   * Affiliate updateMany
   */
  export type AffiliateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Affiliates.
     */
    data: XOR<AffiliateUpdateManyMutationInput, AffiliateUncheckedUpdateManyInput>
    /**
     * Filter which Affiliates to update
     */
    where?: AffiliateWhereInput
    /**
     * Limit how many Affiliates to update.
     */
    limit?: number
  }

  /**
   * Affiliate updateManyAndReturn
   */
  export type AffiliateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * The data used to update Affiliates.
     */
    data: XOR<AffiliateUpdateManyMutationInput, AffiliateUncheckedUpdateManyInput>
    /**
     * Filter which Affiliates to update
     */
    where?: AffiliateWhereInput
    /**
     * Limit how many Affiliates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Affiliate upsert
   */
  export type AffiliateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
    /**
     * The filter to search for the Affiliate to update in case it exists.
     */
    where: AffiliateWhereUniqueInput
    /**
     * In case the Affiliate found by the `where` argument doesn't exist, create a new Affiliate with this data.
     */
    create: XOR<AffiliateCreateInput, AffiliateUncheckedCreateInput>
    /**
     * In case the Affiliate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffiliateUpdateInput, AffiliateUncheckedUpdateInput>
  }

  /**
   * Affiliate delete
   */
  export type AffiliateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
    /**
     * Filter which Affiliate to delete.
     */
    where: AffiliateWhereUniqueInput
  }

  /**
   * Affiliate deleteMany
   */
  export type AffiliateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Affiliates to delete
     */
    where?: AffiliateWhereInput
    /**
     * Limit how many Affiliates to delete.
     */
    limit?: number
  }

  /**
   * Affiliate.referrals
   */
  export type Affiliate$referralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
    where?: AffiliateReferralWhereInput
    orderBy?: AffiliateReferralOrderByWithRelationInput | AffiliateReferralOrderByWithRelationInput[]
    cursor?: AffiliateReferralWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffiliateReferralScalarFieldEnum | AffiliateReferralScalarFieldEnum[]
  }

  /**
   * Affiliate.orders
   */
  export type Affiliate$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Affiliate.payouts
   */
  export type Affiliate$payoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    where?: PayoutWhereInput
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    cursor?: PayoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Affiliate without action
   */
  export type AffiliateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
  }


  /**
   * Model Payout
   */

  export type AggregatePayout = {
    _count: PayoutCountAggregateOutputType | null
    _avg: PayoutAvgAggregateOutputType | null
    _sum: PayoutSumAggregateOutputType | null
    _min: PayoutMinAggregateOutputType | null
    _max: PayoutMaxAggregateOutputType | null
  }

  export type PayoutAvgAggregateOutputType = {
    payout_id: number | null
    affiliate_id: number | null
    amount: Decimal | null
  }

  export type PayoutSumAggregateOutputType = {
    payout_id: number | null
    affiliate_id: number | null
    amount: Decimal | null
  }

  export type PayoutMinAggregateOutputType = {
    payout_id: number | null
    affiliate_id: number | null
    amount: Decimal | null
    status: string | null
    decline_reason: string | null
    created_at: Date | null
  }

  export type PayoutMaxAggregateOutputType = {
    payout_id: number | null
    affiliate_id: number | null
    amount: Decimal | null
    status: string | null
    decline_reason: string | null
    created_at: Date | null
  }

  export type PayoutCountAggregateOutputType = {
    payout_id: number
    affiliate_id: number
    amount: number
    status: number
    decline_reason: number
    created_at: number
    _all: number
  }


  export type PayoutAvgAggregateInputType = {
    payout_id?: true
    affiliate_id?: true
    amount?: true
  }

  export type PayoutSumAggregateInputType = {
    payout_id?: true
    affiliate_id?: true
    amount?: true
  }

  export type PayoutMinAggregateInputType = {
    payout_id?: true
    affiliate_id?: true
    amount?: true
    status?: true
    decline_reason?: true
    created_at?: true
  }

  export type PayoutMaxAggregateInputType = {
    payout_id?: true
    affiliate_id?: true
    amount?: true
    status?: true
    decline_reason?: true
    created_at?: true
  }

  export type PayoutCountAggregateInputType = {
    payout_id?: true
    affiliate_id?: true
    amount?: true
    status?: true
    decline_reason?: true
    created_at?: true
    _all?: true
  }

  export type PayoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payout to aggregate.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payouts
    **/
    _count?: true | PayoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayoutAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayoutSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayoutMaxAggregateInputType
  }

  export type GetPayoutAggregateType<T extends PayoutAggregateArgs> = {
        [P in keyof T & keyof AggregatePayout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayout[P]>
      : GetScalarType<T[P], AggregatePayout[P]>
  }




  export type PayoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutWhereInput
    orderBy?: PayoutOrderByWithAggregationInput | PayoutOrderByWithAggregationInput[]
    by: PayoutScalarFieldEnum[] | PayoutScalarFieldEnum
    having?: PayoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayoutCountAggregateInputType | true
    _avg?: PayoutAvgAggregateInputType
    _sum?: PayoutSumAggregateInputType
    _min?: PayoutMinAggregateInputType
    _max?: PayoutMaxAggregateInputType
  }

  export type PayoutGroupByOutputType = {
    payout_id: number
    affiliate_id: number
    amount: Decimal
    status: string
    decline_reason: string | null
    created_at: Date
    _count: PayoutCountAggregateOutputType | null
    _avg: PayoutAvgAggregateOutputType | null
    _sum: PayoutSumAggregateOutputType | null
    _min: PayoutMinAggregateOutputType | null
    _max: PayoutMaxAggregateOutputType | null
  }

  type GetPayoutGroupByPayload<T extends PayoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayoutGroupByOutputType[P]>
            : GetScalarType<T[P], PayoutGroupByOutputType[P]>
        }
      >
    >


  export type PayoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    payout_id?: boolean
    affiliate_id?: boolean
    amount?: boolean
    status?: boolean
    decline_reason?: boolean
    created_at?: boolean
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>

  export type PayoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    payout_id?: boolean
    affiliate_id?: boolean
    amount?: boolean
    status?: boolean
    decline_reason?: boolean
    created_at?: boolean
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>

  export type PayoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    payout_id?: boolean
    affiliate_id?: boolean
    amount?: boolean
    status?: boolean
    decline_reason?: boolean
    created_at?: boolean
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>

  export type PayoutSelectScalar = {
    payout_id?: boolean
    affiliate_id?: boolean
    amount?: boolean
    status?: boolean
    decline_reason?: boolean
    created_at?: boolean
  }

  export type PayoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"payout_id" | "affiliate_id" | "amount" | "status" | "decline_reason" | "created_at", ExtArgs["result"]["payout"]>
  export type PayoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
  }
  export type PayoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
  }
  export type PayoutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
  }

  export type $PayoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payout"
    objects: {
      affiliate: Prisma.$AffiliatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      payout_id: number
      affiliate_id: number
      amount: Prisma.Decimal
      status: string
      decline_reason: string | null
      created_at: Date
    }, ExtArgs["result"]["payout"]>
    composites: {}
  }

  type PayoutGetPayload<S extends boolean | null | undefined | PayoutDefaultArgs> = $Result.GetResult<Prisma.$PayoutPayload, S>

  type PayoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PayoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PayoutCountAggregateInputType | true
    }

  export interface PayoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payout'], meta: { name: 'Payout' } }
    /**
     * Find zero or one Payout that matches the filter.
     * @param {PayoutFindUniqueArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayoutFindUniqueArgs>(args: SelectSubset<T, PayoutFindUniqueArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayoutFindUniqueOrThrowArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayoutFindUniqueOrThrowArgs>(args: SelectSubset<T, PayoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindFirstArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayoutFindFirstArgs>(args?: SelectSubset<T, PayoutFindFirstArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindFirstOrThrowArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayoutFindFirstOrThrowArgs>(args?: SelectSubset<T, PayoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payouts
     * const payouts = await prisma.payout.findMany()
     * 
     * // Get first 10 Payouts
     * const payouts = await prisma.payout.findMany({ take: 10 })
     * 
     * // Only select the `payout_id`
     * const payoutWithPayout_idOnly = await prisma.payout.findMany({ select: { payout_id: true } })
     * 
     */
    findMany<T extends PayoutFindManyArgs>(args?: SelectSubset<T, PayoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payout.
     * @param {PayoutCreateArgs} args - Arguments to create a Payout.
     * @example
     * // Create one Payout
     * const Payout = await prisma.payout.create({
     *   data: {
     *     // ... data to create a Payout
     *   }
     * })
     * 
     */
    create<T extends PayoutCreateArgs>(args: SelectSubset<T, PayoutCreateArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payouts.
     * @param {PayoutCreateManyArgs} args - Arguments to create many Payouts.
     * @example
     * // Create many Payouts
     * const payout = await prisma.payout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayoutCreateManyArgs>(args?: SelectSubset<T, PayoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payouts and returns the data saved in the database.
     * @param {PayoutCreateManyAndReturnArgs} args - Arguments to create many Payouts.
     * @example
     * // Create many Payouts
     * const payout = await prisma.payout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payouts and only return the `payout_id`
     * const payoutWithPayout_idOnly = await prisma.payout.createManyAndReturn({
     *   select: { payout_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayoutCreateManyAndReturnArgs>(args?: SelectSubset<T, PayoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payout.
     * @param {PayoutDeleteArgs} args - Arguments to delete one Payout.
     * @example
     * // Delete one Payout
     * const Payout = await prisma.payout.delete({
     *   where: {
     *     // ... filter to delete one Payout
     *   }
     * })
     * 
     */
    delete<T extends PayoutDeleteArgs>(args: SelectSubset<T, PayoutDeleteArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payout.
     * @param {PayoutUpdateArgs} args - Arguments to update one Payout.
     * @example
     * // Update one Payout
     * const payout = await prisma.payout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayoutUpdateArgs>(args: SelectSubset<T, PayoutUpdateArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payouts.
     * @param {PayoutDeleteManyArgs} args - Arguments to filter Payouts to delete.
     * @example
     * // Delete a few Payouts
     * const { count } = await prisma.payout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayoutDeleteManyArgs>(args?: SelectSubset<T, PayoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payouts
     * const payout = await prisma.payout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayoutUpdateManyArgs>(args: SelectSubset<T, PayoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payouts and returns the data updated in the database.
     * @param {PayoutUpdateManyAndReturnArgs} args - Arguments to update many Payouts.
     * @example
     * // Update many Payouts
     * const payout = await prisma.payout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payouts and only return the `payout_id`
     * const payoutWithPayout_idOnly = await prisma.payout.updateManyAndReturn({
     *   select: { payout_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PayoutUpdateManyAndReturnArgs>(args: SelectSubset<T, PayoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payout.
     * @param {PayoutUpsertArgs} args - Arguments to update or create a Payout.
     * @example
     * // Update or create a Payout
     * const payout = await prisma.payout.upsert({
     *   create: {
     *     // ... data to create a Payout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payout we want to update
     *   }
     * })
     */
    upsert<T extends PayoutUpsertArgs>(args: SelectSubset<T, PayoutUpsertArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutCountArgs} args - Arguments to filter Payouts to count.
     * @example
     * // Count the number of Payouts
     * const count = await prisma.payout.count({
     *   where: {
     *     // ... the filter for the Payouts we want to count
     *   }
     * })
    **/
    count<T extends PayoutCountArgs>(
      args?: Subset<T, PayoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PayoutAggregateArgs>(args: Subset<T, PayoutAggregateArgs>): Prisma.PrismaPromise<GetPayoutAggregateType<T>>

    /**
     * Group by Payout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PayoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayoutGroupByArgs['orderBy'] }
        : { orderBy?: PayoutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PayoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payout model
   */
  readonly fields: PayoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    affiliate<T extends AffiliateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AffiliateDefaultArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payout model
   */
  interface PayoutFieldRefs {
    readonly payout_id: FieldRef<"Payout", 'Int'>
    readonly affiliate_id: FieldRef<"Payout", 'Int'>
    readonly amount: FieldRef<"Payout", 'Decimal'>
    readonly status: FieldRef<"Payout", 'String'>
    readonly decline_reason: FieldRef<"Payout", 'String'>
    readonly created_at: FieldRef<"Payout", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payout findUnique
   */
  export type PayoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout findUniqueOrThrow
   */
  export type PayoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout findFirst
   */
  export type PayoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout findFirstOrThrow
   */
  export type PayoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout findMany
   */
  export type PayoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payouts to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout create
   */
  export type PayoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The data needed to create a Payout.
     */
    data: XOR<PayoutCreateInput, PayoutUncheckedCreateInput>
  }

  /**
   * Payout createMany
   */
  export type PayoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payouts.
     */
    data: PayoutCreateManyInput | PayoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payout createManyAndReturn
   */
  export type PayoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * The data used to create many Payouts.
     */
    data: PayoutCreateManyInput | PayoutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payout update
   */
  export type PayoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The data needed to update a Payout.
     */
    data: XOR<PayoutUpdateInput, PayoutUncheckedUpdateInput>
    /**
     * Choose, which Payout to update.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout updateMany
   */
  export type PayoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payouts.
     */
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyInput>
    /**
     * Filter which Payouts to update
     */
    where?: PayoutWhereInput
    /**
     * Limit how many Payouts to update.
     */
    limit?: number
  }

  /**
   * Payout updateManyAndReturn
   */
  export type PayoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * The data used to update Payouts.
     */
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyInput>
    /**
     * Filter which Payouts to update
     */
    where?: PayoutWhereInput
    /**
     * Limit how many Payouts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payout upsert
   */
  export type PayoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The filter to search for the Payout to update in case it exists.
     */
    where: PayoutWhereUniqueInput
    /**
     * In case the Payout found by the `where` argument doesn't exist, create a new Payout with this data.
     */
    create: XOR<PayoutCreateInput, PayoutUncheckedCreateInput>
    /**
     * In case the Payout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayoutUpdateInput, PayoutUncheckedUpdateInput>
  }

  /**
   * Payout delete
   */
  export type PayoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter which Payout to delete.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout deleteMany
   */
  export type PayoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payouts to delete
     */
    where?: PayoutWhereInput
    /**
     * Limit how many Payouts to delete.
     */
    limit?: number
  }

  /**
   * Payout without action
   */
  export type PayoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    product_id: number | null
    price: Decimal | null
    cost_price: Decimal | null
    stock_quantity: number | null
  }

  export type ProductSumAggregateOutputType = {
    product_id: number | null
    price: Decimal | null
    cost_price: Decimal | null
    stock_quantity: number | null
  }

  export type ProductMinAggregateOutputType = {
    product_id: number | null
    product_name: string | null
    price: Decimal | null
    cost_price: Decimal | null
    description: string | null
    image: string | null
    stock_quantity: number | null
  }

  export type ProductMaxAggregateOutputType = {
    product_id: number | null
    product_name: string | null
    price: Decimal | null
    cost_price: Decimal | null
    description: string | null
    image: string | null
    stock_quantity: number | null
  }

  export type ProductCountAggregateOutputType = {
    product_id: number
    product_name: number
    price: number
    cost_price: number
    description: number
    image: number
    stock_quantity: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    product_id?: true
    price?: true
    cost_price?: true
    stock_quantity?: true
  }

  export type ProductSumAggregateInputType = {
    product_id?: true
    price?: true
    cost_price?: true
    stock_quantity?: true
  }

  export type ProductMinAggregateInputType = {
    product_id?: true
    product_name?: true
    price?: true
    cost_price?: true
    description?: true
    image?: true
    stock_quantity?: true
  }

  export type ProductMaxAggregateInputType = {
    product_id?: true
    product_name?: true
    price?: true
    cost_price?: true
    description?: true
    image?: true
    stock_quantity?: true
  }

  export type ProductCountAggregateInputType = {
    product_id?: true
    product_name?: true
    price?: true
    cost_price?: true
    description?: true
    image?: true
    stock_quantity?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    product_id: number
    product_name: string
    price: Decimal
    cost_price: Decimal
    description: string | null
    image: string | null
    stock_quantity: number
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    product_id?: boolean
    product_name?: boolean
    price?: boolean
    cost_price?: boolean
    description?: boolean
    image?: boolean
    stock_quantity?: boolean
    order_items?: boolean | Product$order_itemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    product_id?: boolean
    product_name?: boolean
    price?: boolean
    cost_price?: boolean
    description?: boolean
    image?: boolean
    stock_quantity?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    product_id?: boolean
    product_name?: boolean
    price?: boolean
    cost_price?: boolean
    description?: boolean
    image?: boolean
    stock_quantity?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    product_id?: boolean
    product_name?: boolean
    price?: boolean
    cost_price?: boolean
    description?: boolean
    image?: boolean
    stock_quantity?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"product_id" | "product_name" | "price" | "cost_price" | "description" | "image" | "stock_quantity", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order_items?: boolean | Product$order_itemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      order_items: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      product_id: number
      product_name: string
      price: Prisma.Decimal
      cost_price: Prisma.Decimal
      description: string | null
      image: string | null
      stock_quantity: number
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `product_id`
     * const productWithProduct_idOnly = await prisma.product.findMany({ select: { product_id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `product_id`
     * const productWithProduct_idOnly = await prisma.product.createManyAndReturn({
     *   select: { product_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `product_id`
     * const productWithProduct_idOnly = await prisma.product.updateManyAndReturn({
     *   select: { product_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order_items<T extends Product$order_itemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$order_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly product_id: FieldRef<"Product", 'Int'>
    readonly product_name: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Decimal'>
    readonly cost_price: FieldRef<"Product", 'Decimal'>
    readonly description: FieldRef<"Product", 'String'>
    readonly image: FieldRef<"Product", 'String'>
    readonly stock_quantity: FieldRef<"Product", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.order_items
   */
  export type Product$order_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    order_id: number | null
    client_id: number | null
    affiliate_id: number | null
    amount_paid: Decimal | null
  }

  export type OrderSumAggregateOutputType = {
    order_id: number | null
    client_id: number | null
    affiliate_id: number | null
    amount_paid: Decimal | null
  }

  export type OrderMinAggregateOutputType = {
    order_id: number | null
    client_id: number | null
    affiliate_id: number | null
    amount_paid: Decimal | null
    order_date: Date | null
    status: string | null
  }

  export type OrderMaxAggregateOutputType = {
    order_id: number | null
    client_id: number | null
    affiliate_id: number | null
    amount_paid: Decimal | null
    order_date: Date | null
    status: string | null
  }

  export type OrderCountAggregateOutputType = {
    order_id: number
    client_id: number
    affiliate_id: number
    amount_paid: number
    order_date: number
    status: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    order_id?: true
    client_id?: true
    affiliate_id?: true
    amount_paid?: true
  }

  export type OrderSumAggregateInputType = {
    order_id?: true
    client_id?: true
    affiliate_id?: true
    amount_paid?: true
  }

  export type OrderMinAggregateInputType = {
    order_id?: true
    client_id?: true
    affiliate_id?: true
    amount_paid?: true
    order_date?: true
    status?: true
  }

  export type OrderMaxAggregateInputType = {
    order_id?: true
    client_id?: true
    affiliate_id?: true
    amount_paid?: true
    order_date?: true
    status?: true
  }

  export type OrderCountAggregateInputType = {
    order_id?: true
    client_id?: true
    affiliate_id?: true
    amount_paid?: true
    order_date?: true
    status?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    order_id: number
    client_id: number
    affiliate_id: number | null
    amount_paid: Decimal
    order_date: Date
    status: string
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    order_id?: boolean
    client_id?: boolean
    affiliate_id?: boolean
    amount_paid?: boolean
    order_date?: boolean
    status?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
    order_items?: boolean | Order$order_itemsArgs<ExtArgs>
    referrals?: boolean | Order$referralsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    order_id?: boolean
    client_id?: boolean
    affiliate_id?: boolean
    amount_paid?: boolean
    order_date?: boolean
    status?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    order_id?: boolean
    client_id?: boolean
    affiliate_id?: boolean
    amount_paid?: boolean
    order_date?: boolean
    status?: boolean
    client?: boolean | UserDefaultArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    order_id?: boolean
    client_id?: boolean
    affiliate_id?: boolean
    amount_paid?: boolean
    order_date?: boolean
    status?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"order_id" | "client_id" | "affiliate_id" | "amount_paid" | "order_date" | "status", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
    order_items?: boolean | Order$order_itemsArgs<ExtArgs>
    referrals?: boolean | Order$referralsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | UserDefaultArgs<ExtArgs>
    affiliate?: boolean | Order$affiliateArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      client: Prisma.$UserPayload<ExtArgs>
      affiliate: Prisma.$AffiliatePayload<ExtArgs> | null
      order_items: Prisma.$OrderItemPayload<ExtArgs>[]
      referrals: Prisma.$AffiliateReferralPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      order_id: number
      client_id: number
      affiliate_id: number | null
      amount_paid: Prisma.Decimal
      order_date: Date
      status: string
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `order_id`
     * const orderWithOrder_idOnly = await prisma.order.findMany({ select: { order_id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `order_id`
     * const orderWithOrder_idOnly = await prisma.order.createManyAndReturn({
     *   select: { order_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `order_id`
     * const orderWithOrder_idOnly = await prisma.order.updateManyAndReturn({
     *   select: { order_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    affiliate<T extends Order$affiliateArgs<ExtArgs> = {}>(args?: Subset<T, Order$affiliateArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    order_items<T extends Order$order_itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$order_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    referrals<T extends Order$referralsArgs<ExtArgs> = {}>(args?: Subset<T, Order$referralsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly order_id: FieldRef<"Order", 'Int'>
    readonly client_id: FieldRef<"Order", 'Int'>
    readonly affiliate_id: FieldRef<"Order", 'Int'>
    readonly amount_paid: FieldRef<"Order", 'Decimal'>
    readonly order_date: FieldRef<"Order", 'DateTime'>
    readonly status: FieldRef<"Order", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.affiliate
   */
  export type Order$affiliateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliate
     */
    select?: AffiliateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affiliate
     */
    omit?: AffiliateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateInclude<ExtArgs> | null
    where?: AffiliateWhereInput
  }

  /**
   * Order.order_items
   */
  export type Order$order_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order.referrals
   */
  export type Order$referralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
    where?: AffiliateReferralWhereInput
    orderBy?: AffiliateReferralOrderByWithRelationInput | AffiliateReferralOrderByWithRelationInput[]
    cursor?: AffiliateReferralWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffiliateReferralScalarFieldEnum | AffiliateReferralScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    order_id: number | null
    product_id: number | null
    quantity: number | null
    price_at_purchase: Decimal | null
  }

  export type OrderItemSumAggregateOutputType = {
    order_id: number | null
    product_id: number | null
    quantity: number | null
    price_at_purchase: Decimal | null
  }

  export type OrderItemMinAggregateOutputType = {
    order_id: number | null
    product_id: number | null
    quantity: number | null
    price_at_purchase: Decimal | null
  }

  export type OrderItemMaxAggregateOutputType = {
    order_id: number | null
    product_id: number | null
    quantity: number | null
    price_at_purchase: Decimal | null
  }

  export type OrderItemCountAggregateOutputType = {
    order_id: number
    product_id: number
    quantity: number
    price_at_purchase: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    order_id?: true
    product_id?: true
    quantity?: true
    price_at_purchase?: true
  }

  export type OrderItemSumAggregateInputType = {
    order_id?: true
    product_id?: true
    quantity?: true
    price_at_purchase?: true
  }

  export type OrderItemMinAggregateInputType = {
    order_id?: true
    product_id?: true
    quantity?: true
    price_at_purchase?: true
  }

  export type OrderItemMaxAggregateInputType = {
    order_id?: true
    product_id?: true
    quantity?: true
    price_at_purchase?: true
  }

  export type OrderItemCountAggregateInputType = {
    order_id?: true
    product_id?: true
    quantity?: true
    price_at_purchase?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    order_id: number
    product_id: number
    quantity: number
    price_at_purchase: Decimal
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    order_id?: boolean
    product_id?: boolean
    quantity?: boolean
    price_at_purchase?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    order_id?: boolean
    product_id?: boolean
    quantity?: boolean
    price_at_purchase?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    order_id?: boolean
    product_id?: boolean
    quantity?: boolean
    price_at_purchase?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    order_id?: boolean
    product_id?: boolean
    quantity?: boolean
    price_at_purchase?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"order_id" | "product_id" | "quantity" | "price_at_purchase", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      order_id: number
      product_id: number
      quantity: number
      price_at_purchase: Prisma.Decimal
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `order_id`
     * const orderItemWithOrder_idOnly = await prisma.orderItem.findMany({ select: { order_id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `order_id`
     * const orderItemWithOrder_idOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { order_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `order_id`
     * const orderItemWithOrder_idOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { order_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly order_id: FieldRef<"OrderItem", 'Int'>
    readonly product_id: FieldRef<"OrderItem", 'Int'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly price_at_purchase: FieldRef<"OrderItem", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model AffiliateReferral
   */

  export type AggregateAffiliateReferral = {
    _count: AffiliateReferralCountAggregateOutputType | null
    _avg: AffiliateReferralAvgAggregateOutputType | null
    _sum: AffiliateReferralSumAggregateOutputType | null
    _min: AffiliateReferralMinAggregateOutputType | null
    _max: AffiliateReferralMaxAggregateOutputType | null
  }

  export type AffiliateReferralAvgAggregateOutputType = {
    referral_id: number | null
    client_id: number | null
    affiliate_id: number | null
    order_id: number | null
    commission_amount: Decimal | null
  }

  export type AffiliateReferralSumAggregateOutputType = {
    referral_id: number | null
    client_id: number | null
    affiliate_id: number | null
    order_id: number | null
    commission_amount: Decimal | null
  }

  export type AffiliateReferralMinAggregateOutputType = {
    referral_id: number | null
    client_id: number | null
    affiliate_id: number | null
    order_id: number | null
    date_referred: Date | null
    commission_amount: Decimal | null
  }

  export type AffiliateReferralMaxAggregateOutputType = {
    referral_id: number | null
    client_id: number | null
    affiliate_id: number | null
    order_id: number | null
    date_referred: Date | null
    commission_amount: Decimal | null
  }

  export type AffiliateReferralCountAggregateOutputType = {
    referral_id: number
    client_id: number
    affiliate_id: number
    order_id: number
    date_referred: number
    commission_amount: number
    _all: number
  }


  export type AffiliateReferralAvgAggregateInputType = {
    referral_id?: true
    client_id?: true
    affiliate_id?: true
    order_id?: true
    commission_amount?: true
  }

  export type AffiliateReferralSumAggregateInputType = {
    referral_id?: true
    client_id?: true
    affiliate_id?: true
    order_id?: true
    commission_amount?: true
  }

  export type AffiliateReferralMinAggregateInputType = {
    referral_id?: true
    client_id?: true
    affiliate_id?: true
    order_id?: true
    date_referred?: true
    commission_amount?: true
  }

  export type AffiliateReferralMaxAggregateInputType = {
    referral_id?: true
    client_id?: true
    affiliate_id?: true
    order_id?: true
    date_referred?: true
    commission_amount?: true
  }

  export type AffiliateReferralCountAggregateInputType = {
    referral_id?: true
    client_id?: true
    affiliate_id?: true
    order_id?: true
    date_referred?: true
    commission_amount?: true
    _all?: true
  }

  export type AffiliateReferralAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateReferral to aggregate.
     */
    where?: AffiliateReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateReferrals to fetch.
     */
    orderBy?: AffiliateReferralOrderByWithRelationInput | AffiliateReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffiliateReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateReferrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateReferrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AffiliateReferrals
    **/
    _count?: true | AffiliateReferralCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AffiliateReferralAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AffiliateReferralSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffiliateReferralMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffiliateReferralMaxAggregateInputType
  }

  export type GetAffiliateReferralAggregateType<T extends AffiliateReferralAggregateArgs> = {
        [P in keyof T & keyof AggregateAffiliateReferral]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffiliateReferral[P]>
      : GetScalarType<T[P], AggregateAffiliateReferral[P]>
  }




  export type AffiliateReferralGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateReferralWhereInput
    orderBy?: AffiliateReferralOrderByWithAggregationInput | AffiliateReferralOrderByWithAggregationInput[]
    by: AffiliateReferralScalarFieldEnum[] | AffiliateReferralScalarFieldEnum
    having?: AffiliateReferralScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffiliateReferralCountAggregateInputType | true
    _avg?: AffiliateReferralAvgAggregateInputType
    _sum?: AffiliateReferralSumAggregateInputType
    _min?: AffiliateReferralMinAggregateInputType
    _max?: AffiliateReferralMaxAggregateInputType
  }

  export type AffiliateReferralGroupByOutputType = {
    referral_id: number
    client_id: number
    affiliate_id: number
    order_id: number
    date_referred: Date
    commission_amount: Decimal
    _count: AffiliateReferralCountAggregateOutputType | null
    _avg: AffiliateReferralAvgAggregateOutputType | null
    _sum: AffiliateReferralSumAggregateOutputType | null
    _min: AffiliateReferralMinAggregateOutputType | null
    _max: AffiliateReferralMaxAggregateOutputType | null
  }

  type GetAffiliateReferralGroupByPayload<T extends AffiliateReferralGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffiliateReferralGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffiliateReferralGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffiliateReferralGroupByOutputType[P]>
            : GetScalarType<T[P], AffiliateReferralGroupByOutputType[P]>
        }
      >
    >


  export type AffiliateReferralSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    referral_id?: boolean
    client_id?: boolean
    affiliate_id?: boolean
    order_id?: boolean
    date_referred?: boolean
    commission_amount?: boolean
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateReferral"]>

  export type AffiliateReferralSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    referral_id?: boolean
    client_id?: boolean
    affiliate_id?: boolean
    order_id?: boolean
    date_referred?: boolean
    commission_amount?: boolean
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateReferral"]>

  export type AffiliateReferralSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    referral_id?: boolean
    client_id?: boolean
    affiliate_id?: boolean
    order_id?: boolean
    date_referred?: boolean
    commission_amount?: boolean
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateReferral"]>

  export type AffiliateReferralSelectScalar = {
    referral_id?: boolean
    client_id?: boolean
    affiliate_id?: boolean
    order_id?: boolean
    date_referred?: boolean
    commission_amount?: boolean
  }

  export type AffiliateReferralOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"referral_id" | "client_id" | "affiliate_id" | "order_id" | "date_referred" | "commission_amount", ExtArgs["result"]["affiliateReferral"]>
  export type AffiliateReferralInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type AffiliateReferralIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type AffiliateReferralIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affiliate?: boolean | AffiliateDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $AffiliateReferralPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AffiliateReferral"
    objects: {
      affiliate: Prisma.$AffiliatePayload<ExtArgs>
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      referral_id: number
      client_id: number
      affiliate_id: number
      order_id: number
      date_referred: Date
      commission_amount: Prisma.Decimal
    }, ExtArgs["result"]["affiliateReferral"]>
    composites: {}
  }

  type AffiliateReferralGetPayload<S extends boolean | null | undefined | AffiliateReferralDefaultArgs> = $Result.GetResult<Prisma.$AffiliateReferralPayload, S>

  type AffiliateReferralCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AffiliateReferralFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AffiliateReferralCountAggregateInputType | true
    }

  export interface AffiliateReferralDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AffiliateReferral'], meta: { name: 'AffiliateReferral' } }
    /**
     * Find zero or one AffiliateReferral that matches the filter.
     * @param {AffiliateReferralFindUniqueArgs} args - Arguments to find a AffiliateReferral
     * @example
     * // Get one AffiliateReferral
     * const affiliateReferral = await prisma.affiliateReferral.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffiliateReferralFindUniqueArgs>(args: SelectSubset<T, AffiliateReferralFindUniqueArgs<ExtArgs>>): Prisma__AffiliateReferralClient<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AffiliateReferral that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AffiliateReferralFindUniqueOrThrowArgs} args - Arguments to find a AffiliateReferral
     * @example
     * // Get one AffiliateReferral
     * const affiliateReferral = await prisma.affiliateReferral.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffiliateReferralFindUniqueOrThrowArgs>(args: SelectSubset<T, AffiliateReferralFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffiliateReferralClient<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateReferral that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateReferralFindFirstArgs} args - Arguments to find a AffiliateReferral
     * @example
     * // Get one AffiliateReferral
     * const affiliateReferral = await prisma.affiliateReferral.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffiliateReferralFindFirstArgs>(args?: SelectSubset<T, AffiliateReferralFindFirstArgs<ExtArgs>>): Prisma__AffiliateReferralClient<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateReferral that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateReferralFindFirstOrThrowArgs} args - Arguments to find a AffiliateReferral
     * @example
     * // Get one AffiliateReferral
     * const affiliateReferral = await prisma.affiliateReferral.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffiliateReferralFindFirstOrThrowArgs>(args?: SelectSubset<T, AffiliateReferralFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffiliateReferralClient<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AffiliateReferrals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateReferralFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AffiliateReferrals
     * const affiliateReferrals = await prisma.affiliateReferral.findMany()
     * 
     * // Get first 10 AffiliateReferrals
     * const affiliateReferrals = await prisma.affiliateReferral.findMany({ take: 10 })
     * 
     * // Only select the `referral_id`
     * const affiliateReferralWithReferral_idOnly = await prisma.affiliateReferral.findMany({ select: { referral_id: true } })
     * 
     */
    findMany<T extends AffiliateReferralFindManyArgs>(args?: SelectSubset<T, AffiliateReferralFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AffiliateReferral.
     * @param {AffiliateReferralCreateArgs} args - Arguments to create a AffiliateReferral.
     * @example
     * // Create one AffiliateReferral
     * const AffiliateReferral = await prisma.affiliateReferral.create({
     *   data: {
     *     // ... data to create a AffiliateReferral
     *   }
     * })
     * 
     */
    create<T extends AffiliateReferralCreateArgs>(args: SelectSubset<T, AffiliateReferralCreateArgs<ExtArgs>>): Prisma__AffiliateReferralClient<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AffiliateReferrals.
     * @param {AffiliateReferralCreateManyArgs} args - Arguments to create many AffiliateReferrals.
     * @example
     * // Create many AffiliateReferrals
     * const affiliateReferral = await prisma.affiliateReferral.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffiliateReferralCreateManyArgs>(args?: SelectSubset<T, AffiliateReferralCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AffiliateReferrals and returns the data saved in the database.
     * @param {AffiliateReferralCreateManyAndReturnArgs} args - Arguments to create many AffiliateReferrals.
     * @example
     * // Create many AffiliateReferrals
     * const affiliateReferral = await prisma.affiliateReferral.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AffiliateReferrals and only return the `referral_id`
     * const affiliateReferralWithReferral_idOnly = await prisma.affiliateReferral.createManyAndReturn({
     *   select: { referral_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffiliateReferralCreateManyAndReturnArgs>(args?: SelectSubset<T, AffiliateReferralCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AffiliateReferral.
     * @param {AffiliateReferralDeleteArgs} args - Arguments to delete one AffiliateReferral.
     * @example
     * // Delete one AffiliateReferral
     * const AffiliateReferral = await prisma.affiliateReferral.delete({
     *   where: {
     *     // ... filter to delete one AffiliateReferral
     *   }
     * })
     * 
     */
    delete<T extends AffiliateReferralDeleteArgs>(args: SelectSubset<T, AffiliateReferralDeleteArgs<ExtArgs>>): Prisma__AffiliateReferralClient<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AffiliateReferral.
     * @param {AffiliateReferralUpdateArgs} args - Arguments to update one AffiliateReferral.
     * @example
     * // Update one AffiliateReferral
     * const affiliateReferral = await prisma.affiliateReferral.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffiliateReferralUpdateArgs>(args: SelectSubset<T, AffiliateReferralUpdateArgs<ExtArgs>>): Prisma__AffiliateReferralClient<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AffiliateReferrals.
     * @param {AffiliateReferralDeleteManyArgs} args - Arguments to filter AffiliateReferrals to delete.
     * @example
     * // Delete a few AffiliateReferrals
     * const { count } = await prisma.affiliateReferral.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffiliateReferralDeleteManyArgs>(args?: SelectSubset<T, AffiliateReferralDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateReferrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateReferralUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AffiliateReferrals
     * const affiliateReferral = await prisma.affiliateReferral.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffiliateReferralUpdateManyArgs>(args: SelectSubset<T, AffiliateReferralUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateReferrals and returns the data updated in the database.
     * @param {AffiliateReferralUpdateManyAndReturnArgs} args - Arguments to update many AffiliateReferrals.
     * @example
     * // Update many AffiliateReferrals
     * const affiliateReferral = await prisma.affiliateReferral.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AffiliateReferrals and only return the `referral_id`
     * const affiliateReferralWithReferral_idOnly = await prisma.affiliateReferral.updateManyAndReturn({
     *   select: { referral_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AffiliateReferralUpdateManyAndReturnArgs>(args: SelectSubset<T, AffiliateReferralUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AffiliateReferral.
     * @param {AffiliateReferralUpsertArgs} args - Arguments to update or create a AffiliateReferral.
     * @example
     * // Update or create a AffiliateReferral
     * const affiliateReferral = await prisma.affiliateReferral.upsert({
     *   create: {
     *     // ... data to create a AffiliateReferral
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AffiliateReferral we want to update
     *   }
     * })
     */
    upsert<T extends AffiliateReferralUpsertArgs>(args: SelectSubset<T, AffiliateReferralUpsertArgs<ExtArgs>>): Prisma__AffiliateReferralClient<$Result.GetResult<Prisma.$AffiliateReferralPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AffiliateReferrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateReferralCountArgs} args - Arguments to filter AffiliateReferrals to count.
     * @example
     * // Count the number of AffiliateReferrals
     * const count = await prisma.affiliateReferral.count({
     *   where: {
     *     // ... the filter for the AffiliateReferrals we want to count
     *   }
     * })
    **/
    count<T extends AffiliateReferralCountArgs>(
      args?: Subset<T, AffiliateReferralCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffiliateReferralCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AffiliateReferral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateReferralAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffiliateReferralAggregateArgs>(args: Subset<T, AffiliateReferralAggregateArgs>): Prisma.PrismaPromise<GetAffiliateReferralAggregateType<T>>

    /**
     * Group by AffiliateReferral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateReferralGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffiliateReferralGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffiliateReferralGroupByArgs['orderBy'] }
        : { orderBy?: AffiliateReferralGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffiliateReferralGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffiliateReferralGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AffiliateReferral model
   */
  readonly fields: AffiliateReferralFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AffiliateReferral.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffiliateReferralClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    affiliate<T extends AffiliateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AffiliateDefaultArgs<ExtArgs>>): Prisma__AffiliateClient<$Result.GetResult<Prisma.$AffiliatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AffiliateReferral model
   */
  interface AffiliateReferralFieldRefs {
    readonly referral_id: FieldRef<"AffiliateReferral", 'Int'>
    readonly client_id: FieldRef<"AffiliateReferral", 'Int'>
    readonly affiliate_id: FieldRef<"AffiliateReferral", 'Int'>
    readonly order_id: FieldRef<"AffiliateReferral", 'Int'>
    readonly date_referred: FieldRef<"AffiliateReferral", 'DateTime'>
    readonly commission_amount: FieldRef<"AffiliateReferral", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * AffiliateReferral findUnique
   */
  export type AffiliateReferralFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateReferral to fetch.
     */
    where: AffiliateReferralWhereUniqueInput
  }

  /**
   * AffiliateReferral findUniqueOrThrow
   */
  export type AffiliateReferralFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateReferral to fetch.
     */
    where: AffiliateReferralWhereUniqueInput
  }

  /**
   * AffiliateReferral findFirst
   */
  export type AffiliateReferralFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateReferral to fetch.
     */
    where?: AffiliateReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateReferrals to fetch.
     */
    orderBy?: AffiliateReferralOrderByWithRelationInput | AffiliateReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateReferrals.
     */
    cursor?: AffiliateReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateReferrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateReferrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateReferrals.
     */
    distinct?: AffiliateReferralScalarFieldEnum | AffiliateReferralScalarFieldEnum[]
  }

  /**
   * AffiliateReferral findFirstOrThrow
   */
  export type AffiliateReferralFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateReferral to fetch.
     */
    where?: AffiliateReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateReferrals to fetch.
     */
    orderBy?: AffiliateReferralOrderByWithRelationInput | AffiliateReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateReferrals.
     */
    cursor?: AffiliateReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateReferrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateReferrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateReferrals.
     */
    distinct?: AffiliateReferralScalarFieldEnum | AffiliateReferralScalarFieldEnum[]
  }

  /**
   * AffiliateReferral findMany
   */
  export type AffiliateReferralFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateReferrals to fetch.
     */
    where?: AffiliateReferralWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateReferrals to fetch.
     */
    orderBy?: AffiliateReferralOrderByWithRelationInput | AffiliateReferralOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AffiliateReferrals.
     */
    cursor?: AffiliateReferralWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateReferrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateReferrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateReferrals.
     */
    distinct?: AffiliateReferralScalarFieldEnum | AffiliateReferralScalarFieldEnum[]
  }

  /**
   * AffiliateReferral create
   */
  export type AffiliateReferralCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
    /**
     * The data needed to create a AffiliateReferral.
     */
    data: XOR<AffiliateReferralCreateInput, AffiliateReferralUncheckedCreateInput>
  }

  /**
   * AffiliateReferral createMany
   */
  export type AffiliateReferralCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AffiliateReferrals.
     */
    data: AffiliateReferralCreateManyInput | AffiliateReferralCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AffiliateReferral createManyAndReturn
   */
  export type AffiliateReferralCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * The data used to create many AffiliateReferrals.
     */
    data: AffiliateReferralCreateManyInput | AffiliateReferralCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AffiliateReferral update
   */
  export type AffiliateReferralUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
    /**
     * The data needed to update a AffiliateReferral.
     */
    data: XOR<AffiliateReferralUpdateInput, AffiliateReferralUncheckedUpdateInput>
    /**
     * Choose, which AffiliateReferral to update.
     */
    where: AffiliateReferralWhereUniqueInput
  }

  /**
   * AffiliateReferral updateMany
   */
  export type AffiliateReferralUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AffiliateReferrals.
     */
    data: XOR<AffiliateReferralUpdateManyMutationInput, AffiliateReferralUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateReferrals to update
     */
    where?: AffiliateReferralWhereInput
    /**
     * Limit how many AffiliateReferrals to update.
     */
    limit?: number
  }

  /**
   * AffiliateReferral updateManyAndReturn
   */
  export type AffiliateReferralUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * The data used to update AffiliateReferrals.
     */
    data: XOR<AffiliateReferralUpdateManyMutationInput, AffiliateReferralUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateReferrals to update
     */
    where?: AffiliateReferralWhereInput
    /**
     * Limit how many AffiliateReferrals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AffiliateReferral upsert
   */
  export type AffiliateReferralUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
    /**
     * The filter to search for the AffiliateReferral to update in case it exists.
     */
    where: AffiliateReferralWhereUniqueInput
    /**
     * In case the AffiliateReferral found by the `where` argument doesn't exist, create a new AffiliateReferral with this data.
     */
    create: XOR<AffiliateReferralCreateInput, AffiliateReferralUncheckedCreateInput>
    /**
     * In case the AffiliateReferral was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffiliateReferralUpdateInput, AffiliateReferralUncheckedUpdateInput>
  }

  /**
   * AffiliateReferral delete
   */
  export type AffiliateReferralDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
    /**
     * Filter which AffiliateReferral to delete.
     */
    where: AffiliateReferralWhereUniqueInput
  }

  /**
   * AffiliateReferral deleteMany
   */
  export type AffiliateReferralDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateReferrals to delete
     */
    where?: AffiliateReferralWhereInput
    /**
     * Limit how many AffiliateReferrals to delete.
     */
    limit?: number
  }

  /**
   * AffiliateReferral without action
   */
  export type AffiliateReferralDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateReferral
     */
    select?: AffiliateReferralSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateReferral
     */
    omit?: AffiliateReferralOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateReferralInclude<ExtArgs> | null
  }


  /**
   * Model OtpCode
   */

  export type AggregateOtpCode = {
    _count: OtpCodeCountAggregateOutputType | null
    _avg: OtpCodeAvgAggregateOutputType | null
    _sum: OtpCodeSumAggregateOutputType | null
    _min: OtpCodeMinAggregateOutputType | null
    _max: OtpCodeMaxAggregateOutputType | null
  }

  export type OtpCodeAvgAggregateOutputType = {
    id: number | null
  }

  export type OtpCodeSumAggregateOutputType = {
    id: number | null
  }

  export type OtpCodeMinAggregateOutputType = {
    id: number | null
    email: string | null
    code: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type OtpCodeMaxAggregateOutputType = {
    id: number | null
    email: string | null
    code: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type OtpCodeCountAggregateOutputType = {
    id: number
    email: number
    code: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type OtpCodeAvgAggregateInputType = {
    id?: true
  }

  export type OtpCodeSumAggregateInputType = {
    id?: true
  }

  export type OtpCodeMinAggregateInputType = {
    id?: true
    email?: true
    code?: true
    expiresAt?: true
    createdAt?: true
  }

  export type OtpCodeMaxAggregateInputType = {
    id?: true
    email?: true
    code?: true
    expiresAt?: true
    createdAt?: true
  }

  export type OtpCodeCountAggregateInputType = {
    id?: true
    email?: true
    code?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type OtpCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpCode to aggregate.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OtpCodes
    **/
    _count?: true | OtpCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OtpCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OtpCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpCodeMaxAggregateInputType
  }

  export type GetOtpCodeAggregateType<T extends OtpCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateOtpCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtpCode[P]>
      : GetScalarType<T[P], AggregateOtpCode[P]>
  }




  export type OtpCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpCodeWhereInput
    orderBy?: OtpCodeOrderByWithAggregationInput | OtpCodeOrderByWithAggregationInput[]
    by: OtpCodeScalarFieldEnum[] | OtpCodeScalarFieldEnum
    having?: OtpCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpCodeCountAggregateInputType | true
    _avg?: OtpCodeAvgAggregateInputType
    _sum?: OtpCodeSumAggregateInputType
    _min?: OtpCodeMinAggregateInputType
    _max?: OtpCodeMaxAggregateInputType
  }

  export type OtpCodeGroupByOutputType = {
    id: number
    email: string
    code: string
    expiresAt: Date
    createdAt: Date
    _count: OtpCodeCountAggregateOutputType | null
    _avg: OtpCodeAvgAggregateOutputType | null
    _sum: OtpCodeSumAggregateOutputType | null
    _min: OtpCodeMinAggregateOutputType | null
    _max: OtpCodeMaxAggregateOutputType | null
  }

  type GetOtpCodeGroupByPayload<T extends OtpCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpCodeGroupByOutputType[P]>
            : GetScalarType<T[P], OtpCodeGroupByOutputType[P]>
        }
      >
    >


  export type OtpCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectScalar = {
    id?: boolean
    email?: boolean
    code?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type OtpCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "code" | "expiresAt" | "createdAt", ExtArgs["result"]["otpCode"]>

  export type $OtpCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OtpCode"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      code: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["otpCode"]>
    composites: {}
  }

  type OtpCodeGetPayload<S extends boolean | null | undefined | OtpCodeDefaultArgs> = $Result.GetResult<Prisma.$OtpCodePayload, S>

  type OtpCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpCodeCountAggregateInputType | true
    }

  export interface OtpCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OtpCode'], meta: { name: 'OtpCode' } }
    /**
     * Find zero or one OtpCode that matches the filter.
     * @param {OtpCodeFindUniqueArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpCodeFindUniqueArgs>(args: SelectSubset<T, OtpCodeFindUniqueArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OtpCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpCodeFindUniqueOrThrowArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindFirstArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpCodeFindFirstArgs>(args?: SelectSubset<T, OtpCodeFindFirstArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindFirstOrThrowArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OtpCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OtpCodes
     * const otpCodes = await prisma.otpCode.findMany()
     * 
     * // Get first 10 OtpCodes
     * const otpCodes = await prisma.otpCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpCodeFindManyArgs>(args?: SelectSubset<T, OtpCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OtpCode.
     * @param {OtpCodeCreateArgs} args - Arguments to create a OtpCode.
     * @example
     * // Create one OtpCode
     * const OtpCode = await prisma.otpCode.create({
     *   data: {
     *     // ... data to create a OtpCode
     *   }
     * })
     * 
     */
    create<T extends OtpCodeCreateArgs>(args: SelectSubset<T, OtpCodeCreateArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OtpCodes.
     * @param {OtpCodeCreateManyArgs} args - Arguments to create many OtpCodes.
     * @example
     * // Create many OtpCodes
     * const otpCode = await prisma.otpCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpCodeCreateManyArgs>(args?: SelectSubset<T, OtpCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OtpCodes and returns the data saved in the database.
     * @param {OtpCodeCreateManyAndReturnArgs} args - Arguments to create many OtpCodes.
     * @example
     * // Create many OtpCodes
     * const otpCode = await prisma.otpCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OtpCodes and only return the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OtpCode.
     * @param {OtpCodeDeleteArgs} args - Arguments to delete one OtpCode.
     * @example
     * // Delete one OtpCode
     * const OtpCode = await prisma.otpCode.delete({
     *   where: {
     *     // ... filter to delete one OtpCode
     *   }
     * })
     * 
     */
    delete<T extends OtpCodeDeleteArgs>(args: SelectSubset<T, OtpCodeDeleteArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OtpCode.
     * @param {OtpCodeUpdateArgs} args - Arguments to update one OtpCode.
     * @example
     * // Update one OtpCode
     * const otpCode = await prisma.otpCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpCodeUpdateArgs>(args: SelectSubset<T, OtpCodeUpdateArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OtpCodes.
     * @param {OtpCodeDeleteManyArgs} args - Arguments to filter OtpCodes to delete.
     * @example
     * // Delete a few OtpCodes
     * const { count } = await prisma.otpCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpCodeDeleteManyArgs>(args?: SelectSubset<T, OtpCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OtpCodes
     * const otpCode = await prisma.otpCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpCodeUpdateManyArgs>(args: SelectSubset<T, OtpCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpCodes and returns the data updated in the database.
     * @param {OtpCodeUpdateManyAndReturnArgs} args - Arguments to update many OtpCodes.
     * @example
     * // Update many OtpCodes
     * const otpCode = await prisma.otpCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OtpCodes and only return the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OtpCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OtpCode.
     * @param {OtpCodeUpsertArgs} args - Arguments to update or create a OtpCode.
     * @example
     * // Update or create a OtpCode
     * const otpCode = await prisma.otpCode.upsert({
     *   create: {
     *     // ... data to create a OtpCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OtpCode we want to update
     *   }
     * })
     */
    upsert<T extends OtpCodeUpsertArgs>(args: SelectSubset<T, OtpCodeUpsertArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OtpCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeCountArgs} args - Arguments to filter OtpCodes to count.
     * @example
     * // Count the number of OtpCodes
     * const count = await prisma.otpCode.count({
     *   where: {
     *     // ... the filter for the OtpCodes we want to count
     *   }
     * })
    **/
    count<T extends OtpCodeCountArgs>(
      args?: Subset<T, OtpCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OtpCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OtpCodeAggregateArgs>(args: Subset<T, OtpCodeAggregateArgs>): Prisma.PrismaPromise<GetOtpCodeAggregateType<T>>

    /**
     * Group by OtpCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OtpCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpCodeGroupByArgs['orderBy'] }
        : { orderBy?: OtpCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OtpCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OtpCode model
   */
  readonly fields: OtpCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OtpCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OtpCode model
   */
  interface OtpCodeFieldRefs {
    readonly id: FieldRef<"OtpCode", 'Int'>
    readonly email: FieldRef<"OtpCode", 'String'>
    readonly code: FieldRef<"OtpCode", 'String'>
    readonly expiresAt: FieldRef<"OtpCode", 'DateTime'>
    readonly createdAt: FieldRef<"OtpCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OtpCode findUnique
   */
  export type OtpCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode findUniqueOrThrow
   */
  export type OtpCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode findFirst
   */
  export type OtpCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode findFirstOrThrow
   */
  export type OtpCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode findMany
   */
  export type OtpCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter, which OtpCodes to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode create
   */
  export type OtpCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data needed to create a OtpCode.
     */
    data: XOR<OtpCodeCreateInput, OtpCodeUncheckedCreateInput>
  }

  /**
   * OtpCode createMany
   */
  export type OtpCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OtpCodes.
     */
    data: OtpCodeCreateManyInput | OtpCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpCode createManyAndReturn
   */
  export type OtpCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data used to create many OtpCodes.
     */
    data: OtpCodeCreateManyInput | OtpCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpCode update
   */
  export type OtpCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data needed to update a OtpCode.
     */
    data: XOR<OtpCodeUpdateInput, OtpCodeUncheckedUpdateInput>
    /**
     * Choose, which OtpCode to update.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode updateMany
   */
  export type OtpCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OtpCodes.
     */
    data: XOR<OtpCodeUpdateManyMutationInput, OtpCodeUncheckedUpdateManyInput>
    /**
     * Filter which OtpCodes to update
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to update.
     */
    limit?: number
  }

  /**
   * OtpCode updateManyAndReturn
   */
  export type OtpCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data used to update OtpCodes.
     */
    data: XOR<OtpCodeUpdateManyMutationInput, OtpCodeUncheckedUpdateManyInput>
    /**
     * Filter which OtpCodes to update
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to update.
     */
    limit?: number
  }

  /**
   * OtpCode upsert
   */
  export type OtpCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The filter to search for the OtpCode to update in case it exists.
     */
    where: OtpCodeWhereUniqueInput
    /**
     * In case the OtpCode found by the `where` argument doesn't exist, create a new OtpCode with this data.
     */
    create: XOR<OtpCodeCreateInput, OtpCodeUncheckedCreateInput>
    /**
     * In case the OtpCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpCodeUpdateInput, OtpCodeUncheckedUpdateInput>
  }

  /**
   * OtpCode delete
   */
  export type OtpCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Filter which OtpCode to delete.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode deleteMany
   */
  export type OtpCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpCodes to delete
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to delete.
     */
    limit?: number
  }

  /**
   * OtpCode without action
   */
  export type OtpCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    user_id: 'user_id',
    email: 'email',
    password_hash: 'password_hash',
    role: 'role',
    created_at: 'created_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AffiliateScalarFieldEnum: {
    affiliate_id: 'affiliate_id',
    user_id: 'user_id',
    name: 'name',
    commissions_earned: 'commissions_earned',
    available_balance: 'available_balance',
    number_of_referrals: 'number_of_referrals',
    account_status: 'account_status',
    referral_link: 'referral_link',
    referral_code: 'referral_code'
  };

  export type AffiliateScalarFieldEnum = (typeof AffiliateScalarFieldEnum)[keyof typeof AffiliateScalarFieldEnum]


  export const PayoutScalarFieldEnum: {
    payout_id: 'payout_id',
    affiliate_id: 'affiliate_id',
    amount: 'amount',
    status: 'status',
    decline_reason: 'decline_reason',
    created_at: 'created_at'
  };

  export type PayoutScalarFieldEnum = (typeof PayoutScalarFieldEnum)[keyof typeof PayoutScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    product_id: 'product_id',
    product_name: 'product_name',
    price: 'price',
    cost_price: 'cost_price',
    description: 'description',
    image: 'image',
    stock_quantity: 'stock_quantity'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    order_id: 'order_id',
    client_id: 'client_id',
    affiliate_id: 'affiliate_id',
    amount_paid: 'amount_paid',
    order_date: 'order_date',
    status: 'status'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    order_id: 'order_id',
    product_id: 'product_id',
    quantity: 'quantity',
    price_at_purchase: 'price_at_purchase'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const AffiliateReferralScalarFieldEnum: {
    referral_id: 'referral_id',
    client_id: 'client_id',
    affiliate_id: 'affiliate_id',
    order_id: 'order_id',
    date_referred: 'date_referred',
    commission_amount: 'commission_amount'
  };

  export type AffiliateReferralScalarFieldEnum = (typeof AffiliateReferralScalarFieldEnum)[keyof typeof AffiliateReferralScalarFieldEnum]


  export const OtpCodeScalarFieldEnum: {
    id: 'id',
    email: 'email',
    code: 'code',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type OtpCodeScalarFieldEnum = (typeof OtpCodeScalarFieldEnum)[keyof typeof OtpCodeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    user_id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
    affiliates?: XOR<AffiliateNullableScalarRelationFilter, AffiliateWhereInput> | null
    orders?: OrderListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    affiliates?: AffiliateOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password_hash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
    affiliates?: XOR<AffiliateNullableScalarRelationFilter, AffiliateWhereInput> | null
    orders?: OrderListRelationFilter
  }, "user_id" | "email">

  export type UserOrderByWithAggregationInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AffiliateWhereInput = {
    AND?: AffiliateWhereInput | AffiliateWhereInput[]
    OR?: AffiliateWhereInput[]
    NOT?: AffiliateWhereInput | AffiliateWhereInput[]
    affiliate_id?: IntFilter<"Affiliate"> | number
    user_id?: IntFilter<"Affiliate"> | number
    name?: StringFilter<"Affiliate"> | string
    commissions_earned?: DecimalFilter<"Affiliate"> | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFilter<"Affiliate"> | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFilter<"Affiliate"> | number
    account_status?: StringFilter<"Affiliate"> | string
    referral_link?: StringFilter<"Affiliate"> | string
    referral_code?: StringFilter<"Affiliate"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    referrals?: AffiliateReferralListRelationFilter
    orders?: OrderListRelationFilter
    payouts?: PayoutListRelationFilter
  }

  export type AffiliateOrderByWithRelationInput = {
    affiliate_id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    commissions_earned?: SortOrder
    available_balance?: SortOrder
    number_of_referrals?: SortOrder
    account_status?: SortOrder
    referral_link?: SortOrder
    referral_code?: SortOrder
    user?: UserOrderByWithRelationInput
    referrals?: AffiliateReferralOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    payouts?: PayoutOrderByRelationAggregateInput
  }

  export type AffiliateWhereUniqueInput = Prisma.AtLeast<{
    affiliate_id?: number
    user_id?: number
    referral_code?: string
    AND?: AffiliateWhereInput | AffiliateWhereInput[]
    OR?: AffiliateWhereInput[]
    NOT?: AffiliateWhereInput | AffiliateWhereInput[]
    name?: StringFilter<"Affiliate"> | string
    commissions_earned?: DecimalFilter<"Affiliate"> | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFilter<"Affiliate"> | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFilter<"Affiliate"> | number
    account_status?: StringFilter<"Affiliate"> | string
    referral_link?: StringFilter<"Affiliate"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    referrals?: AffiliateReferralListRelationFilter
    orders?: OrderListRelationFilter
    payouts?: PayoutListRelationFilter
  }, "affiliate_id" | "user_id" | "referral_code">

  export type AffiliateOrderByWithAggregationInput = {
    affiliate_id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    commissions_earned?: SortOrder
    available_balance?: SortOrder
    number_of_referrals?: SortOrder
    account_status?: SortOrder
    referral_link?: SortOrder
    referral_code?: SortOrder
    _count?: AffiliateCountOrderByAggregateInput
    _avg?: AffiliateAvgOrderByAggregateInput
    _max?: AffiliateMaxOrderByAggregateInput
    _min?: AffiliateMinOrderByAggregateInput
    _sum?: AffiliateSumOrderByAggregateInput
  }

  export type AffiliateScalarWhereWithAggregatesInput = {
    AND?: AffiliateScalarWhereWithAggregatesInput | AffiliateScalarWhereWithAggregatesInput[]
    OR?: AffiliateScalarWhereWithAggregatesInput[]
    NOT?: AffiliateScalarWhereWithAggregatesInput | AffiliateScalarWhereWithAggregatesInput[]
    affiliate_id?: IntWithAggregatesFilter<"Affiliate"> | number
    user_id?: IntWithAggregatesFilter<"Affiliate"> | number
    name?: StringWithAggregatesFilter<"Affiliate"> | string
    commissions_earned?: DecimalWithAggregatesFilter<"Affiliate"> | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalWithAggregatesFilter<"Affiliate"> | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntWithAggregatesFilter<"Affiliate"> | number
    account_status?: StringWithAggregatesFilter<"Affiliate"> | string
    referral_link?: StringWithAggregatesFilter<"Affiliate"> | string
    referral_code?: StringWithAggregatesFilter<"Affiliate"> | string
  }

  export type PayoutWhereInput = {
    AND?: PayoutWhereInput | PayoutWhereInput[]
    OR?: PayoutWhereInput[]
    NOT?: PayoutWhereInput | PayoutWhereInput[]
    payout_id?: IntFilter<"Payout"> | number
    affiliate_id?: IntFilter<"Payout"> | number
    amount?: DecimalFilter<"Payout"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Payout"> | string
    decline_reason?: StringNullableFilter<"Payout"> | string | null
    created_at?: DateTimeFilter<"Payout"> | Date | string
    affiliate?: XOR<AffiliateScalarRelationFilter, AffiliateWhereInput>
  }

  export type PayoutOrderByWithRelationInput = {
    payout_id?: SortOrder
    affiliate_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    decline_reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    affiliate?: AffiliateOrderByWithRelationInput
  }

  export type PayoutWhereUniqueInput = Prisma.AtLeast<{
    payout_id?: number
    AND?: PayoutWhereInput | PayoutWhereInput[]
    OR?: PayoutWhereInput[]
    NOT?: PayoutWhereInput | PayoutWhereInput[]
    affiliate_id?: IntFilter<"Payout"> | number
    amount?: DecimalFilter<"Payout"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Payout"> | string
    decline_reason?: StringNullableFilter<"Payout"> | string | null
    created_at?: DateTimeFilter<"Payout"> | Date | string
    affiliate?: XOR<AffiliateScalarRelationFilter, AffiliateWhereInput>
  }, "payout_id">

  export type PayoutOrderByWithAggregationInput = {
    payout_id?: SortOrder
    affiliate_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    decline_reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: PayoutCountOrderByAggregateInput
    _avg?: PayoutAvgOrderByAggregateInput
    _max?: PayoutMaxOrderByAggregateInput
    _min?: PayoutMinOrderByAggregateInput
    _sum?: PayoutSumOrderByAggregateInput
  }

  export type PayoutScalarWhereWithAggregatesInput = {
    AND?: PayoutScalarWhereWithAggregatesInput | PayoutScalarWhereWithAggregatesInput[]
    OR?: PayoutScalarWhereWithAggregatesInput[]
    NOT?: PayoutScalarWhereWithAggregatesInput | PayoutScalarWhereWithAggregatesInput[]
    payout_id?: IntWithAggregatesFilter<"Payout"> | number
    affiliate_id?: IntWithAggregatesFilter<"Payout"> | number
    amount?: DecimalWithAggregatesFilter<"Payout"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"Payout"> | string
    decline_reason?: StringNullableWithAggregatesFilter<"Payout"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Payout"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    product_id?: IntFilter<"Product"> | number
    product_name?: StringFilter<"Product"> | string
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    cost_price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"Product"> | string | null
    image?: StringNullableFilter<"Product"> | string | null
    stock_quantity?: IntFilter<"Product"> | number
    order_items?: OrderItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    product_id?: SortOrder
    product_name?: SortOrder
    price?: SortOrder
    cost_price?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    stock_quantity?: SortOrder
    order_items?: OrderItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    product_id?: number
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    product_name?: StringFilter<"Product"> | string
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    cost_price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"Product"> | string | null
    image?: StringNullableFilter<"Product"> | string | null
    stock_quantity?: IntFilter<"Product"> | number
    order_items?: OrderItemListRelationFilter
  }, "product_id">

  export type ProductOrderByWithAggregationInput = {
    product_id?: SortOrder
    product_name?: SortOrder
    price?: SortOrder
    cost_price?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    stock_quantity?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    product_id?: IntWithAggregatesFilter<"Product"> | number
    product_name?: StringWithAggregatesFilter<"Product"> | string
    price?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    cost_price?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    image?: StringNullableWithAggregatesFilter<"Product"> | string | null
    stock_quantity?: IntWithAggregatesFilter<"Product"> | number
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    order_id?: IntFilter<"Order"> | number
    client_id?: IntFilter<"Order"> | number
    affiliate_id?: IntNullableFilter<"Order"> | number | null
    amount_paid?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFilter<"Order"> | Date | string
    status?: StringFilter<"Order"> | string
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    affiliate?: XOR<AffiliateNullableScalarRelationFilter, AffiliateWhereInput> | null
    order_items?: OrderItemListRelationFilter
    referrals?: AffiliateReferralListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    order_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrderInput | SortOrder
    amount_paid?: SortOrder
    order_date?: SortOrder
    status?: SortOrder
    client?: UserOrderByWithRelationInput
    affiliate?: AffiliateOrderByWithRelationInput
    order_items?: OrderItemOrderByRelationAggregateInput
    referrals?: AffiliateReferralOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    order_id?: number
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    client_id?: IntFilter<"Order"> | number
    affiliate_id?: IntNullableFilter<"Order"> | number | null
    amount_paid?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFilter<"Order"> | Date | string
    status?: StringFilter<"Order"> | string
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
    affiliate?: XOR<AffiliateNullableScalarRelationFilter, AffiliateWhereInput> | null
    order_items?: OrderItemListRelationFilter
    referrals?: AffiliateReferralListRelationFilter
  }, "order_id">

  export type OrderOrderByWithAggregationInput = {
    order_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrderInput | SortOrder
    amount_paid?: SortOrder
    order_date?: SortOrder
    status?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    order_id?: IntWithAggregatesFilter<"Order"> | number
    client_id?: IntWithAggregatesFilter<"Order"> | number
    affiliate_id?: IntNullableWithAggregatesFilter<"Order"> | number | null
    amount_paid?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    status?: StringWithAggregatesFilter<"Order"> | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    order_id?: IntFilter<"OrderItem"> | number
    product_id?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    price_at_purchase?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    order_id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    price_at_purchase?: SortOrder
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    order_id_product_id?: OrderItemOrder_idProduct_idCompoundUniqueInput
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    order_id?: IntFilter<"OrderItem"> | number
    product_id?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    price_at_purchase?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "order_id_product_id">

  export type OrderItemOrderByWithAggregationInput = {
    order_id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    price_at_purchase?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    order_id?: IntWithAggregatesFilter<"OrderItem"> | number
    product_id?: IntWithAggregatesFilter<"OrderItem"> | number
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    price_at_purchase?: DecimalWithAggregatesFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralWhereInput = {
    AND?: AffiliateReferralWhereInput | AffiliateReferralWhereInput[]
    OR?: AffiliateReferralWhereInput[]
    NOT?: AffiliateReferralWhereInput | AffiliateReferralWhereInput[]
    referral_id?: IntFilter<"AffiliateReferral"> | number
    client_id?: IntFilter<"AffiliateReferral"> | number
    affiliate_id?: IntFilter<"AffiliateReferral"> | number
    order_id?: IntFilter<"AffiliateReferral"> | number
    date_referred?: DateTimeFilter<"AffiliateReferral"> | Date | string
    commission_amount?: DecimalFilter<"AffiliateReferral"> | Decimal | DecimalJsLike | number | string
    affiliate?: XOR<AffiliateScalarRelationFilter, AffiliateWhereInput>
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type AffiliateReferralOrderByWithRelationInput = {
    referral_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    order_id?: SortOrder
    date_referred?: SortOrder
    commission_amount?: SortOrder
    affiliate?: AffiliateOrderByWithRelationInput
    order?: OrderOrderByWithRelationInput
  }

  export type AffiliateReferralWhereUniqueInput = Prisma.AtLeast<{
    referral_id?: number
    AND?: AffiliateReferralWhereInput | AffiliateReferralWhereInput[]
    OR?: AffiliateReferralWhereInput[]
    NOT?: AffiliateReferralWhereInput | AffiliateReferralWhereInput[]
    client_id?: IntFilter<"AffiliateReferral"> | number
    affiliate_id?: IntFilter<"AffiliateReferral"> | number
    order_id?: IntFilter<"AffiliateReferral"> | number
    date_referred?: DateTimeFilter<"AffiliateReferral"> | Date | string
    commission_amount?: DecimalFilter<"AffiliateReferral"> | Decimal | DecimalJsLike | number | string
    affiliate?: XOR<AffiliateScalarRelationFilter, AffiliateWhereInput>
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "referral_id">

  export type AffiliateReferralOrderByWithAggregationInput = {
    referral_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    order_id?: SortOrder
    date_referred?: SortOrder
    commission_amount?: SortOrder
    _count?: AffiliateReferralCountOrderByAggregateInput
    _avg?: AffiliateReferralAvgOrderByAggregateInput
    _max?: AffiliateReferralMaxOrderByAggregateInput
    _min?: AffiliateReferralMinOrderByAggregateInput
    _sum?: AffiliateReferralSumOrderByAggregateInput
  }

  export type AffiliateReferralScalarWhereWithAggregatesInput = {
    AND?: AffiliateReferralScalarWhereWithAggregatesInput | AffiliateReferralScalarWhereWithAggregatesInput[]
    OR?: AffiliateReferralScalarWhereWithAggregatesInput[]
    NOT?: AffiliateReferralScalarWhereWithAggregatesInput | AffiliateReferralScalarWhereWithAggregatesInput[]
    referral_id?: IntWithAggregatesFilter<"AffiliateReferral"> | number
    client_id?: IntWithAggregatesFilter<"AffiliateReferral"> | number
    affiliate_id?: IntWithAggregatesFilter<"AffiliateReferral"> | number
    order_id?: IntWithAggregatesFilter<"AffiliateReferral"> | number
    date_referred?: DateTimeWithAggregatesFilter<"AffiliateReferral"> | Date | string
    commission_amount?: DecimalWithAggregatesFilter<"AffiliateReferral"> | Decimal | DecimalJsLike | number | string
  }

  export type OtpCodeWhereInput = {
    AND?: OtpCodeWhereInput | OtpCodeWhereInput[]
    OR?: OtpCodeWhereInput[]
    NOT?: OtpCodeWhereInput | OtpCodeWhereInput[]
    id?: IntFilter<"OtpCode"> | number
    email?: StringFilter<"OtpCode"> | string
    code?: StringFilter<"OtpCode"> | string
    expiresAt?: DateTimeFilter<"OtpCode"> | Date | string
    createdAt?: DateTimeFilter<"OtpCode"> | Date | string
  }

  export type OtpCodeOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OtpCodeWhereInput | OtpCodeWhereInput[]
    OR?: OtpCodeWhereInput[]
    NOT?: OtpCodeWhereInput | OtpCodeWhereInput[]
    email?: StringFilter<"OtpCode"> | string
    code?: StringFilter<"OtpCode"> | string
    expiresAt?: DateTimeFilter<"OtpCode"> | Date | string
    createdAt?: DateTimeFilter<"OtpCode"> | Date | string
  }, "id">

  export type OtpCodeOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: OtpCodeCountOrderByAggregateInput
    _avg?: OtpCodeAvgOrderByAggregateInput
    _max?: OtpCodeMaxOrderByAggregateInput
    _min?: OtpCodeMinOrderByAggregateInput
    _sum?: OtpCodeSumOrderByAggregateInput
  }

  export type OtpCodeScalarWhereWithAggregatesInput = {
    AND?: OtpCodeScalarWhereWithAggregatesInput | OtpCodeScalarWhereWithAggregatesInput[]
    OR?: OtpCodeScalarWhereWithAggregatesInput[]
    NOT?: OtpCodeScalarWhereWithAggregatesInput | OtpCodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OtpCode"> | number
    email?: StringWithAggregatesFilter<"OtpCode"> | string
    code?: StringWithAggregatesFilter<"OtpCode"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"OtpCode"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"OtpCode"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    affiliates?: AffiliateCreateNestedOneWithoutUserInput
    orders?: OrderCreateNestedManyWithoutClientInput
  }

  export type UserUncheckedCreateInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    affiliates?: AffiliateUncheckedCreateNestedOneWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutClientInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliates?: AffiliateUpdateOneWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutClientNestedInput
  }

  export type UserUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliates?: AffiliateUncheckedUpdateOneWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserCreateManyInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateCreateInput = {
    name: string
    commissions_earned?: Decimal | DecimalJsLike | number | string
    available_balance?: Decimal | DecimalJsLike | number | string
    number_of_referrals?: number
    account_status?: string
    referral_link: string
    referral_code: string
    user: UserCreateNestedOneWithoutAffiliatesInput
    referrals?: AffiliateReferralCreateNestedManyWithoutAffiliateInput
    orders?: OrderCreateNestedManyWithoutAffiliateInput
    payouts?: PayoutCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateUncheckedCreateInput = {
    affiliate_id?: number
    user_id: number
    name: string
    commissions_earned?: Decimal | DecimalJsLike | number | string
    available_balance?: Decimal | DecimalJsLike | number | string
    number_of_referrals?: number
    account_status?: string
    referral_link: string
    referral_code: string
    referrals?: AffiliateReferralUncheckedCreateNestedManyWithoutAffiliateInput
    orders?: OrderUncheckedCreateNestedManyWithoutAffiliateInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAffiliatesNestedInput
    referrals?: AffiliateReferralUpdateManyWithoutAffiliateNestedInput
    orders?: OrderUpdateManyWithoutAffiliateNestedInput
    payouts?: PayoutUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateUncheckedUpdateInput = {
    affiliate_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
    referrals?: AffiliateReferralUncheckedUpdateManyWithoutAffiliateNestedInput
    orders?: OrderUncheckedUpdateManyWithoutAffiliateNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateCreateManyInput = {
    affiliate_id?: number
    user_id: number
    name: string
    commissions_earned?: Decimal | DecimalJsLike | number | string
    available_balance?: Decimal | DecimalJsLike | number | string
    number_of_referrals?: number
    account_status?: string
    referral_link: string
    referral_code: string
  }

  export type AffiliateUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
  }

  export type AffiliateUncheckedUpdateManyInput = {
    affiliate_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
  }

  export type PayoutCreateInput = {
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    decline_reason?: string | null
    created_at?: Date | string
    affiliate: AffiliateCreateNestedOneWithoutPayoutsInput
  }

  export type PayoutUncheckedCreateInput = {
    payout_id?: number
    affiliate_id: number
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    decline_reason?: string | null
    created_at?: Date | string
  }

  export type PayoutUpdateInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    decline_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliate?: AffiliateUpdateOneRequiredWithoutPayoutsNestedInput
  }

  export type PayoutUncheckedUpdateInput = {
    payout_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    decline_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutCreateManyInput = {
    payout_id?: number
    affiliate_id: number
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    decline_reason?: string | null
    created_at?: Date | string
  }

  export type PayoutUpdateManyMutationInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    decline_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUncheckedUpdateManyInput = {
    payout_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    decline_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    product_name: string
    price: Decimal | DecimalJsLike | number | string
    cost_price?: Decimal | DecimalJsLike | number | string
    description?: string | null
    image?: string | null
    stock_quantity?: number
    order_items?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    product_id?: number
    product_name: string
    price: Decimal | DecimalJsLike | number | string
    cost_price?: Decimal | DecimalJsLike | number | string
    description?: string | null
    image?: string | null
    stock_quantity?: number
    order_items?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    product_name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cost_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock_quantity?: IntFieldUpdateOperationsInput | number
    order_items?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    product_id?: IntFieldUpdateOperationsInput | number
    product_name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cost_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock_quantity?: IntFieldUpdateOperationsInput | number
    order_items?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    product_id?: number
    product_name: string
    price: Decimal | DecimalJsLike | number | string
    cost_price?: Decimal | DecimalJsLike | number | string
    description?: string | null
    image?: string | null
    stock_quantity?: number
  }

  export type ProductUpdateManyMutationInput = {
    product_name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cost_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock_quantity?: IntFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateManyInput = {
    product_id?: IntFieldUpdateOperationsInput | number
    product_name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cost_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock_quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderCreateInput = {
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
    client: UserCreateNestedOneWithoutOrdersInput
    affiliate?: AffiliateCreateNestedOneWithoutOrdersInput
    order_items?: OrderItemCreateNestedManyWithoutOrderInput
    referrals?: AffiliateReferralCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    order_id?: number
    client_id: number
    affiliate_id?: number | null
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
    order_items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    referrals?: AffiliateReferralUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    client?: UserUpdateOneRequiredWithoutOrdersNestedInput
    affiliate?: AffiliateUpdateOneWithoutOrdersNestedInput
    order_items?: OrderItemUpdateManyWithoutOrderNestedInput
    referrals?: AffiliateReferralUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: NullableIntFieldUpdateOperationsInput | number | null
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    order_items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    referrals?: AffiliateReferralUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    order_id?: number
    client_id: number
    affiliate_id?: number | null
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
  }

  export type OrderUpdateManyMutationInput = {
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type OrderUncheckedUpdateManyInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: NullableIntFieldUpdateOperationsInput | number | null
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type OrderItemCreateInput = {
    quantity: number
    price_at_purchase: Decimal | DecimalJsLike | number | string
    order: OrderCreateNestedOneWithoutOrder_itemsInput
    product: ProductCreateNestedOneWithoutOrder_itemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    order_id: number
    product_id: number
    quantity: number
    price_at_purchase: Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    price_at_purchase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order?: OrderUpdateOneRequiredWithoutOrder_itemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrder_itemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    product_id?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    price_at_purchase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type OrderItemCreateManyInput = {
    order_id: number
    product_id: number
    quantity: number
    price_at_purchase: Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    price_at_purchase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUncheckedUpdateManyInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    product_id?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    price_at_purchase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralCreateInput = {
    client_id: number
    date_referred?: Date | string
    commission_amount: Decimal | DecimalJsLike | number | string
    affiliate: AffiliateCreateNestedOneWithoutReferralsInput
    order: OrderCreateNestedOneWithoutReferralsInput
  }

  export type AffiliateReferralUncheckedCreateInput = {
    referral_id?: number
    client_id: number
    affiliate_id: number
    order_id: number
    date_referred?: Date | string
    commission_amount: Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralUpdateInput = {
    client_id?: IntFieldUpdateOperationsInput | number
    date_referred?: DateTimeFieldUpdateOperationsInput | Date | string
    commission_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    affiliate?: AffiliateUpdateOneRequiredWithoutReferralsNestedInput
    order?: OrderUpdateOneRequiredWithoutReferralsNestedInput
  }

  export type AffiliateReferralUncheckedUpdateInput = {
    referral_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: IntFieldUpdateOperationsInput | number
    order_id?: IntFieldUpdateOperationsInput | number
    date_referred?: DateTimeFieldUpdateOperationsInput | Date | string
    commission_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralCreateManyInput = {
    referral_id?: number
    client_id: number
    affiliate_id: number
    order_id: number
    date_referred?: Date | string
    commission_amount: Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralUpdateManyMutationInput = {
    client_id?: IntFieldUpdateOperationsInput | number
    date_referred?: DateTimeFieldUpdateOperationsInput | Date | string
    commission_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralUncheckedUpdateManyInput = {
    referral_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: IntFieldUpdateOperationsInput | number
    order_id?: IntFieldUpdateOperationsInput | number
    date_referred?: DateTimeFieldUpdateOperationsInput | Date | string
    commission_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type OtpCodeCreateInput = {
    email: string
    code: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OtpCodeUncheckedCreateInput = {
    id?: number
    email: string
    code: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OtpCodeUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeCreateManyInput = {
    id?: number
    email: string
    code: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OtpCodeUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AffiliateNullableScalarRelationFilter = {
    is?: AffiliateWhereInput | null
    isNot?: AffiliateWhereInput | null
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AffiliateReferralListRelationFilter = {
    every?: AffiliateReferralWhereInput
    some?: AffiliateReferralWhereInput
    none?: AffiliateReferralWhereInput
  }

  export type PayoutListRelationFilter = {
    every?: PayoutWhereInput
    some?: PayoutWhereInput
    none?: PayoutWhereInput
  }

  export type AffiliateReferralOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PayoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AffiliateCountOrderByAggregateInput = {
    affiliate_id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    commissions_earned?: SortOrder
    available_balance?: SortOrder
    number_of_referrals?: SortOrder
    account_status?: SortOrder
    referral_link?: SortOrder
    referral_code?: SortOrder
  }

  export type AffiliateAvgOrderByAggregateInput = {
    affiliate_id?: SortOrder
    user_id?: SortOrder
    commissions_earned?: SortOrder
    available_balance?: SortOrder
    number_of_referrals?: SortOrder
  }

  export type AffiliateMaxOrderByAggregateInput = {
    affiliate_id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    commissions_earned?: SortOrder
    available_balance?: SortOrder
    number_of_referrals?: SortOrder
    account_status?: SortOrder
    referral_link?: SortOrder
    referral_code?: SortOrder
  }

  export type AffiliateMinOrderByAggregateInput = {
    affiliate_id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    commissions_earned?: SortOrder
    available_balance?: SortOrder
    number_of_referrals?: SortOrder
    account_status?: SortOrder
    referral_link?: SortOrder
    referral_code?: SortOrder
  }

  export type AffiliateSumOrderByAggregateInput = {
    affiliate_id?: SortOrder
    user_id?: SortOrder
    commissions_earned?: SortOrder
    available_balance?: SortOrder
    number_of_referrals?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AffiliateScalarRelationFilter = {
    is?: AffiliateWhereInput
    isNot?: AffiliateWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PayoutCountOrderByAggregateInput = {
    payout_id?: SortOrder
    affiliate_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    decline_reason?: SortOrder
    created_at?: SortOrder
  }

  export type PayoutAvgOrderByAggregateInput = {
    payout_id?: SortOrder
    affiliate_id?: SortOrder
    amount?: SortOrder
  }

  export type PayoutMaxOrderByAggregateInput = {
    payout_id?: SortOrder
    affiliate_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    decline_reason?: SortOrder
    created_at?: SortOrder
  }

  export type PayoutMinOrderByAggregateInput = {
    payout_id?: SortOrder
    affiliate_id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    decline_reason?: SortOrder
    created_at?: SortOrder
  }

  export type PayoutSumOrderByAggregateInput = {
    payout_id?: SortOrder
    affiliate_id?: SortOrder
    amount?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    product_id?: SortOrder
    product_name?: SortOrder
    price?: SortOrder
    cost_price?: SortOrder
    description?: SortOrder
    image?: SortOrder
    stock_quantity?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    product_id?: SortOrder
    price?: SortOrder
    cost_price?: SortOrder
    stock_quantity?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    product_id?: SortOrder
    product_name?: SortOrder
    price?: SortOrder
    cost_price?: SortOrder
    description?: SortOrder
    image?: SortOrder
    stock_quantity?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    product_id?: SortOrder
    product_name?: SortOrder
    price?: SortOrder
    cost_price?: SortOrder
    description?: SortOrder
    image?: SortOrder
    stock_quantity?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    product_id?: SortOrder
    price?: SortOrder
    cost_price?: SortOrder
    stock_quantity?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type OrderCountOrderByAggregateInput = {
    order_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    amount_paid?: SortOrder
    order_date?: SortOrder
    status?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    order_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    amount_paid?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    order_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    amount_paid?: SortOrder
    order_date?: SortOrder
    status?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    order_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    amount_paid?: SortOrder
    order_date?: SortOrder
    status?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    order_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    amount_paid?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type OrderItemOrder_idProduct_idCompoundUniqueInput = {
    order_id: number
    product_id: number
  }

  export type OrderItemCountOrderByAggregateInput = {
    order_id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    price_at_purchase?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    order_id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    price_at_purchase?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    order_id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    price_at_purchase?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    order_id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    price_at_purchase?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    order_id?: SortOrder
    product_id?: SortOrder
    quantity?: SortOrder
    price_at_purchase?: SortOrder
  }

  export type AffiliateReferralCountOrderByAggregateInput = {
    referral_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    order_id?: SortOrder
    date_referred?: SortOrder
    commission_amount?: SortOrder
  }

  export type AffiliateReferralAvgOrderByAggregateInput = {
    referral_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    order_id?: SortOrder
    commission_amount?: SortOrder
  }

  export type AffiliateReferralMaxOrderByAggregateInput = {
    referral_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    order_id?: SortOrder
    date_referred?: SortOrder
    commission_amount?: SortOrder
  }

  export type AffiliateReferralMinOrderByAggregateInput = {
    referral_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    order_id?: SortOrder
    date_referred?: SortOrder
    commission_amount?: SortOrder
  }

  export type AffiliateReferralSumOrderByAggregateInput = {
    referral_id?: SortOrder
    client_id?: SortOrder
    affiliate_id?: SortOrder
    order_id?: SortOrder
    commission_amount?: SortOrder
  }

  export type OtpCodeCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OtpCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AffiliateCreateNestedOneWithoutUserInput = {
    create?: XOR<AffiliateCreateWithoutUserInput, AffiliateUncheckedCreateWithoutUserInput>
    connectOrCreate?: AffiliateCreateOrConnectWithoutUserInput
    connect?: AffiliateWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutClientInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type AffiliateUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AffiliateCreateWithoutUserInput, AffiliateUncheckedCreateWithoutUserInput>
    connectOrCreate?: AffiliateCreateOrConnectWithoutUserInput
    connect?: AffiliateWhereUniqueInput
  }

  export type OrderUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AffiliateUpdateOneWithoutUserNestedInput = {
    create?: XOR<AffiliateCreateWithoutUserInput, AffiliateUncheckedCreateWithoutUserInput>
    connectOrCreate?: AffiliateCreateOrConnectWithoutUserInput
    upsert?: AffiliateUpsertWithoutUserInput
    disconnect?: AffiliateWhereInput | boolean
    delete?: AffiliateWhereInput | boolean
    connect?: AffiliateWhereUniqueInput
    update?: XOR<XOR<AffiliateUpdateToOneWithWhereWithoutUserInput, AffiliateUpdateWithoutUserInput>, AffiliateUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithoutClientNestedInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutClientInput | OrderUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutClientInput | OrderUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutClientInput | OrderUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AffiliateUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AffiliateCreateWithoutUserInput, AffiliateUncheckedCreateWithoutUserInput>
    connectOrCreate?: AffiliateCreateOrConnectWithoutUserInput
    upsert?: AffiliateUpsertWithoutUserInput
    disconnect?: AffiliateWhereInput | boolean
    delete?: AffiliateWhereInput | boolean
    connect?: AffiliateWhereUniqueInput
    update?: XOR<XOR<AffiliateUpdateToOneWithWhereWithoutUserInput, AffiliateUpdateWithoutUserInput>, AffiliateUncheckedUpdateWithoutUserInput>
  }

  export type OrderUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutClientInput | OrderUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutClientInput | OrderUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutClientInput | OrderUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAffiliatesInput = {
    create?: XOR<UserCreateWithoutAffiliatesInput, UserUncheckedCreateWithoutAffiliatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffiliatesInput
    connect?: UserWhereUniqueInput
  }

  export type AffiliateReferralCreateNestedManyWithoutAffiliateInput = {
    create?: XOR<AffiliateReferralCreateWithoutAffiliateInput, AffiliateReferralUncheckedCreateWithoutAffiliateInput> | AffiliateReferralCreateWithoutAffiliateInput[] | AffiliateReferralUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: AffiliateReferralCreateOrConnectWithoutAffiliateInput | AffiliateReferralCreateOrConnectWithoutAffiliateInput[]
    createMany?: AffiliateReferralCreateManyAffiliateInputEnvelope
    connect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutAffiliateInput = {
    create?: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput> | OrderCreateWithoutAffiliateInput[] | OrderUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAffiliateInput | OrderCreateOrConnectWithoutAffiliateInput[]
    createMany?: OrderCreateManyAffiliateInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PayoutCreateNestedManyWithoutAffiliateInput = {
    create?: XOR<PayoutCreateWithoutAffiliateInput, PayoutUncheckedCreateWithoutAffiliateInput> | PayoutCreateWithoutAffiliateInput[] | PayoutUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutAffiliateInput | PayoutCreateOrConnectWithoutAffiliateInput[]
    createMany?: PayoutCreateManyAffiliateInputEnvelope
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
  }

  export type AffiliateReferralUncheckedCreateNestedManyWithoutAffiliateInput = {
    create?: XOR<AffiliateReferralCreateWithoutAffiliateInput, AffiliateReferralUncheckedCreateWithoutAffiliateInput> | AffiliateReferralCreateWithoutAffiliateInput[] | AffiliateReferralUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: AffiliateReferralCreateOrConnectWithoutAffiliateInput | AffiliateReferralCreateOrConnectWithoutAffiliateInput[]
    createMany?: AffiliateReferralCreateManyAffiliateInputEnvelope
    connect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutAffiliateInput = {
    create?: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput> | OrderCreateWithoutAffiliateInput[] | OrderUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAffiliateInput | OrderCreateOrConnectWithoutAffiliateInput[]
    createMany?: OrderCreateManyAffiliateInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PayoutUncheckedCreateNestedManyWithoutAffiliateInput = {
    create?: XOR<PayoutCreateWithoutAffiliateInput, PayoutUncheckedCreateWithoutAffiliateInput> | PayoutCreateWithoutAffiliateInput[] | PayoutUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutAffiliateInput | PayoutCreateOrConnectWithoutAffiliateInput[]
    createMany?: PayoutCreateManyAffiliateInputEnvelope
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutAffiliatesNestedInput = {
    create?: XOR<UserCreateWithoutAffiliatesInput, UserUncheckedCreateWithoutAffiliatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffiliatesInput
    upsert?: UserUpsertWithoutAffiliatesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAffiliatesInput, UserUpdateWithoutAffiliatesInput>, UserUncheckedUpdateWithoutAffiliatesInput>
  }

  export type AffiliateReferralUpdateManyWithoutAffiliateNestedInput = {
    create?: XOR<AffiliateReferralCreateWithoutAffiliateInput, AffiliateReferralUncheckedCreateWithoutAffiliateInput> | AffiliateReferralCreateWithoutAffiliateInput[] | AffiliateReferralUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: AffiliateReferralCreateOrConnectWithoutAffiliateInput | AffiliateReferralCreateOrConnectWithoutAffiliateInput[]
    upsert?: AffiliateReferralUpsertWithWhereUniqueWithoutAffiliateInput | AffiliateReferralUpsertWithWhereUniqueWithoutAffiliateInput[]
    createMany?: AffiliateReferralCreateManyAffiliateInputEnvelope
    set?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    disconnect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    delete?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    connect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    update?: AffiliateReferralUpdateWithWhereUniqueWithoutAffiliateInput | AffiliateReferralUpdateWithWhereUniqueWithoutAffiliateInput[]
    updateMany?: AffiliateReferralUpdateManyWithWhereWithoutAffiliateInput | AffiliateReferralUpdateManyWithWhereWithoutAffiliateInput[]
    deleteMany?: AffiliateReferralScalarWhereInput | AffiliateReferralScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutAffiliateNestedInput = {
    create?: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput> | OrderCreateWithoutAffiliateInput[] | OrderUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAffiliateInput | OrderCreateOrConnectWithoutAffiliateInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutAffiliateInput | OrderUpsertWithWhereUniqueWithoutAffiliateInput[]
    createMany?: OrderCreateManyAffiliateInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutAffiliateInput | OrderUpdateWithWhereUniqueWithoutAffiliateInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutAffiliateInput | OrderUpdateManyWithWhereWithoutAffiliateInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PayoutUpdateManyWithoutAffiliateNestedInput = {
    create?: XOR<PayoutCreateWithoutAffiliateInput, PayoutUncheckedCreateWithoutAffiliateInput> | PayoutCreateWithoutAffiliateInput[] | PayoutUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutAffiliateInput | PayoutCreateOrConnectWithoutAffiliateInput[]
    upsert?: PayoutUpsertWithWhereUniqueWithoutAffiliateInput | PayoutUpsertWithWhereUniqueWithoutAffiliateInput[]
    createMany?: PayoutCreateManyAffiliateInputEnvelope
    set?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    disconnect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    delete?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    update?: PayoutUpdateWithWhereUniqueWithoutAffiliateInput | PayoutUpdateWithWhereUniqueWithoutAffiliateInput[]
    updateMany?: PayoutUpdateManyWithWhereWithoutAffiliateInput | PayoutUpdateManyWithWhereWithoutAffiliateInput[]
    deleteMany?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
  }

  export type AffiliateReferralUncheckedUpdateManyWithoutAffiliateNestedInput = {
    create?: XOR<AffiliateReferralCreateWithoutAffiliateInput, AffiliateReferralUncheckedCreateWithoutAffiliateInput> | AffiliateReferralCreateWithoutAffiliateInput[] | AffiliateReferralUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: AffiliateReferralCreateOrConnectWithoutAffiliateInput | AffiliateReferralCreateOrConnectWithoutAffiliateInput[]
    upsert?: AffiliateReferralUpsertWithWhereUniqueWithoutAffiliateInput | AffiliateReferralUpsertWithWhereUniqueWithoutAffiliateInput[]
    createMany?: AffiliateReferralCreateManyAffiliateInputEnvelope
    set?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    disconnect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    delete?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    connect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    update?: AffiliateReferralUpdateWithWhereUniqueWithoutAffiliateInput | AffiliateReferralUpdateWithWhereUniqueWithoutAffiliateInput[]
    updateMany?: AffiliateReferralUpdateManyWithWhereWithoutAffiliateInput | AffiliateReferralUpdateManyWithWhereWithoutAffiliateInput[]
    deleteMany?: AffiliateReferralScalarWhereInput | AffiliateReferralScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutAffiliateNestedInput = {
    create?: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput> | OrderCreateWithoutAffiliateInput[] | OrderUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAffiliateInput | OrderCreateOrConnectWithoutAffiliateInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutAffiliateInput | OrderUpsertWithWhereUniqueWithoutAffiliateInput[]
    createMany?: OrderCreateManyAffiliateInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutAffiliateInput | OrderUpdateWithWhereUniqueWithoutAffiliateInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutAffiliateInput | OrderUpdateManyWithWhereWithoutAffiliateInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PayoutUncheckedUpdateManyWithoutAffiliateNestedInput = {
    create?: XOR<PayoutCreateWithoutAffiliateInput, PayoutUncheckedCreateWithoutAffiliateInput> | PayoutCreateWithoutAffiliateInput[] | PayoutUncheckedCreateWithoutAffiliateInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutAffiliateInput | PayoutCreateOrConnectWithoutAffiliateInput[]
    upsert?: PayoutUpsertWithWhereUniqueWithoutAffiliateInput | PayoutUpsertWithWhereUniqueWithoutAffiliateInput[]
    createMany?: PayoutCreateManyAffiliateInputEnvelope
    set?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    disconnect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    delete?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    update?: PayoutUpdateWithWhereUniqueWithoutAffiliateInput | PayoutUpdateWithWhereUniqueWithoutAffiliateInput[]
    updateMany?: PayoutUpdateManyWithWhereWithoutAffiliateInput | PayoutUpdateManyWithWhereWithoutAffiliateInput[]
    deleteMany?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
  }

  export type AffiliateCreateNestedOneWithoutPayoutsInput = {
    create?: XOR<AffiliateCreateWithoutPayoutsInput, AffiliateUncheckedCreateWithoutPayoutsInput>
    connectOrCreate?: AffiliateCreateOrConnectWithoutPayoutsInput
    connect?: AffiliateWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AffiliateUpdateOneRequiredWithoutPayoutsNestedInput = {
    create?: XOR<AffiliateCreateWithoutPayoutsInput, AffiliateUncheckedCreateWithoutPayoutsInput>
    connectOrCreate?: AffiliateCreateOrConnectWithoutPayoutsInput
    upsert?: AffiliateUpsertWithoutPayoutsInput
    connect?: AffiliateWhereUniqueInput
    update?: XOR<XOR<AffiliateUpdateToOneWithWhereWithoutPayoutsInput, AffiliateUpdateWithoutPayoutsInput>, AffiliateUncheckedUpdateWithoutPayoutsInput>
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type AffiliateCreateNestedOneWithoutOrdersInput = {
    create?: XOR<AffiliateCreateWithoutOrdersInput, AffiliateUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AffiliateCreateOrConnectWithoutOrdersInput
    connect?: AffiliateWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type AffiliateReferralCreateNestedManyWithoutOrderInput = {
    create?: XOR<AffiliateReferralCreateWithoutOrderInput, AffiliateReferralUncheckedCreateWithoutOrderInput> | AffiliateReferralCreateWithoutOrderInput[] | AffiliateReferralUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: AffiliateReferralCreateOrConnectWithoutOrderInput | AffiliateReferralCreateOrConnectWithoutOrderInput[]
    createMany?: AffiliateReferralCreateManyOrderInputEnvelope
    connect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type AffiliateReferralUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<AffiliateReferralCreateWithoutOrderInput, AffiliateReferralUncheckedCreateWithoutOrderInput> | AffiliateReferralCreateWithoutOrderInput[] | AffiliateReferralUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: AffiliateReferralCreateOrConnectWithoutOrderInput | AffiliateReferralCreateOrConnectWithoutOrderInput[]
    createMany?: AffiliateReferralCreateManyOrderInputEnvelope
    connect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type AffiliateUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<AffiliateCreateWithoutOrdersInput, AffiliateUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AffiliateCreateOrConnectWithoutOrdersInput
    upsert?: AffiliateUpsertWithoutOrdersInput
    disconnect?: AffiliateWhereInput | boolean
    delete?: AffiliateWhereInput | boolean
    connect?: AffiliateWhereUniqueInput
    update?: XOR<XOR<AffiliateUpdateToOneWithWhereWithoutOrdersInput, AffiliateUpdateWithoutOrdersInput>, AffiliateUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type AffiliateReferralUpdateManyWithoutOrderNestedInput = {
    create?: XOR<AffiliateReferralCreateWithoutOrderInput, AffiliateReferralUncheckedCreateWithoutOrderInput> | AffiliateReferralCreateWithoutOrderInput[] | AffiliateReferralUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: AffiliateReferralCreateOrConnectWithoutOrderInput | AffiliateReferralCreateOrConnectWithoutOrderInput[]
    upsert?: AffiliateReferralUpsertWithWhereUniqueWithoutOrderInput | AffiliateReferralUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: AffiliateReferralCreateManyOrderInputEnvelope
    set?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    disconnect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    delete?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    connect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    update?: AffiliateReferralUpdateWithWhereUniqueWithoutOrderInput | AffiliateReferralUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: AffiliateReferralUpdateManyWithWhereWithoutOrderInput | AffiliateReferralUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: AffiliateReferralScalarWhereInput | AffiliateReferralScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type AffiliateReferralUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<AffiliateReferralCreateWithoutOrderInput, AffiliateReferralUncheckedCreateWithoutOrderInput> | AffiliateReferralCreateWithoutOrderInput[] | AffiliateReferralUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: AffiliateReferralCreateOrConnectWithoutOrderInput | AffiliateReferralCreateOrConnectWithoutOrderInput[]
    upsert?: AffiliateReferralUpsertWithWhereUniqueWithoutOrderInput | AffiliateReferralUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: AffiliateReferralCreateManyOrderInputEnvelope
    set?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    disconnect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    delete?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    connect?: AffiliateReferralWhereUniqueInput | AffiliateReferralWhereUniqueInput[]
    update?: AffiliateReferralUpdateWithWhereUniqueWithoutOrderInput | AffiliateReferralUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: AffiliateReferralUpdateManyWithWhereWithoutOrderInput | AffiliateReferralUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: AffiliateReferralScalarWhereInput | AffiliateReferralScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutOrder_itemsInput = {
    create?: XOR<OrderCreateWithoutOrder_itemsInput, OrderUncheckedCreateWithoutOrder_itemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutOrder_itemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrder_itemsInput = {
    create?: XOR<ProductCreateWithoutOrder_itemsInput, ProductUncheckedCreateWithoutOrder_itemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrder_itemsInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutOrder_itemsNestedInput = {
    create?: XOR<OrderCreateWithoutOrder_itemsInput, OrderUncheckedCreateWithoutOrder_itemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutOrder_itemsInput
    upsert?: OrderUpsertWithoutOrder_itemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutOrder_itemsInput, OrderUpdateWithoutOrder_itemsInput>, OrderUncheckedUpdateWithoutOrder_itemsInput>
  }

  export type ProductUpdateOneRequiredWithoutOrder_itemsNestedInput = {
    create?: XOR<ProductCreateWithoutOrder_itemsInput, ProductUncheckedCreateWithoutOrder_itemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrder_itemsInput
    upsert?: ProductUpsertWithoutOrder_itemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrder_itemsInput, ProductUpdateWithoutOrder_itemsInput>, ProductUncheckedUpdateWithoutOrder_itemsInput>
  }

  export type AffiliateCreateNestedOneWithoutReferralsInput = {
    create?: XOR<AffiliateCreateWithoutReferralsInput, AffiliateUncheckedCreateWithoutReferralsInput>
    connectOrCreate?: AffiliateCreateOrConnectWithoutReferralsInput
    connect?: AffiliateWhereUniqueInput
  }

  export type OrderCreateNestedOneWithoutReferralsInput = {
    create?: XOR<OrderCreateWithoutReferralsInput, OrderUncheckedCreateWithoutReferralsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutReferralsInput
    connect?: OrderWhereUniqueInput
  }

  export type AffiliateUpdateOneRequiredWithoutReferralsNestedInput = {
    create?: XOR<AffiliateCreateWithoutReferralsInput, AffiliateUncheckedCreateWithoutReferralsInput>
    connectOrCreate?: AffiliateCreateOrConnectWithoutReferralsInput
    upsert?: AffiliateUpsertWithoutReferralsInput
    connect?: AffiliateWhereUniqueInput
    update?: XOR<XOR<AffiliateUpdateToOneWithWhereWithoutReferralsInput, AffiliateUpdateWithoutReferralsInput>, AffiliateUncheckedUpdateWithoutReferralsInput>
  }

  export type OrderUpdateOneRequiredWithoutReferralsNestedInput = {
    create?: XOR<OrderCreateWithoutReferralsInput, OrderUncheckedCreateWithoutReferralsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutReferralsInput
    upsert?: OrderUpsertWithoutReferralsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutReferralsInput, OrderUpdateWithoutReferralsInput>, OrderUncheckedUpdateWithoutReferralsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AffiliateCreateWithoutUserInput = {
    name: string
    commissions_earned?: Decimal | DecimalJsLike | number | string
    available_balance?: Decimal | DecimalJsLike | number | string
    number_of_referrals?: number
    account_status?: string
    referral_link: string
    referral_code: string
    referrals?: AffiliateReferralCreateNestedManyWithoutAffiliateInput
    orders?: OrderCreateNestedManyWithoutAffiliateInput
    payouts?: PayoutCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateUncheckedCreateWithoutUserInput = {
    affiliate_id?: number
    name: string
    commissions_earned?: Decimal | DecimalJsLike | number | string
    available_balance?: Decimal | DecimalJsLike | number | string
    number_of_referrals?: number
    account_status?: string
    referral_link: string
    referral_code: string
    referrals?: AffiliateReferralUncheckedCreateNestedManyWithoutAffiliateInput
    orders?: OrderUncheckedCreateNestedManyWithoutAffiliateInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateCreateOrConnectWithoutUserInput = {
    where: AffiliateWhereUniqueInput
    create: XOR<AffiliateCreateWithoutUserInput, AffiliateUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateWithoutClientInput = {
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
    affiliate?: AffiliateCreateNestedOneWithoutOrdersInput
    order_items?: OrderItemCreateNestedManyWithoutOrderInput
    referrals?: AffiliateReferralCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutClientInput = {
    order_id?: number
    affiliate_id?: number | null
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
    order_items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    referrals?: AffiliateReferralUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutClientInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput>
  }

  export type OrderCreateManyClientInputEnvelope = {
    data: OrderCreateManyClientInput | OrderCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type AffiliateUpsertWithoutUserInput = {
    update: XOR<AffiliateUpdateWithoutUserInput, AffiliateUncheckedUpdateWithoutUserInput>
    create: XOR<AffiliateCreateWithoutUserInput, AffiliateUncheckedCreateWithoutUserInput>
    where?: AffiliateWhereInput
  }

  export type AffiliateUpdateToOneWithWhereWithoutUserInput = {
    where?: AffiliateWhereInput
    data: XOR<AffiliateUpdateWithoutUserInput, AffiliateUncheckedUpdateWithoutUserInput>
  }

  export type AffiliateUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
    referrals?: AffiliateReferralUpdateManyWithoutAffiliateNestedInput
    orders?: OrderUpdateManyWithoutAffiliateNestedInput
    payouts?: PayoutUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateUncheckedUpdateWithoutUserInput = {
    affiliate_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
    referrals?: AffiliateReferralUncheckedUpdateManyWithoutAffiliateNestedInput
    orders?: OrderUncheckedUpdateManyWithoutAffiliateNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutAffiliateNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutClientInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutClientInput, OrderUncheckedUpdateWithoutClientInput>
    create: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutClientInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutClientInput, OrderUncheckedUpdateWithoutClientInput>
  }

  export type OrderUpdateManyWithWhereWithoutClientInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutClientInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    order_id?: IntFilter<"Order"> | number
    client_id?: IntFilter<"Order"> | number
    affiliate_id?: IntNullableFilter<"Order"> | number | null
    amount_paid?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFilter<"Order"> | Date | string
    status?: StringFilter<"Order"> | string
  }

  export type UserCreateWithoutAffiliatesInput = {
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    orders?: OrderCreateNestedManyWithoutClientInput
  }

  export type UserUncheckedCreateWithoutAffiliatesInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutClientInput
  }

  export type UserCreateOrConnectWithoutAffiliatesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAffiliatesInput, UserUncheckedCreateWithoutAffiliatesInput>
  }

  export type AffiliateReferralCreateWithoutAffiliateInput = {
    client_id: number
    date_referred?: Date | string
    commission_amount: Decimal | DecimalJsLike | number | string
    order: OrderCreateNestedOneWithoutReferralsInput
  }

  export type AffiliateReferralUncheckedCreateWithoutAffiliateInput = {
    referral_id?: number
    client_id: number
    order_id: number
    date_referred?: Date | string
    commission_amount: Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralCreateOrConnectWithoutAffiliateInput = {
    where: AffiliateReferralWhereUniqueInput
    create: XOR<AffiliateReferralCreateWithoutAffiliateInput, AffiliateReferralUncheckedCreateWithoutAffiliateInput>
  }

  export type AffiliateReferralCreateManyAffiliateInputEnvelope = {
    data: AffiliateReferralCreateManyAffiliateInput | AffiliateReferralCreateManyAffiliateInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutAffiliateInput = {
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
    client: UserCreateNestedOneWithoutOrdersInput
    order_items?: OrderItemCreateNestedManyWithoutOrderInput
    referrals?: AffiliateReferralCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutAffiliateInput = {
    order_id?: number
    client_id: number
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
    order_items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    referrals?: AffiliateReferralUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutAffiliateInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput>
  }

  export type OrderCreateManyAffiliateInputEnvelope = {
    data: OrderCreateManyAffiliateInput | OrderCreateManyAffiliateInput[]
    skipDuplicates?: boolean
  }

  export type PayoutCreateWithoutAffiliateInput = {
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    decline_reason?: string | null
    created_at?: Date | string
  }

  export type PayoutUncheckedCreateWithoutAffiliateInput = {
    payout_id?: number
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    decline_reason?: string | null
    created_at?: Date | string
  }

  export type PayoutCreateOrConnectWithoutAffiliateInput = {
    where: PayoutWhereUniqueInput
    create: XOR<PayoutCreateWithoutAffiliateInput, PayoutUncheckedCreateWithoutAffiliateInput>
  }

  export type PayoutCreateManyAffiliateInputEnvelope = {
    data: PayoutCreateManyAffiliateInput | PayoutCreateManyAffiliateInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAffiliatesInput = {
    update: XOR<UserUpdateWithoutAffiliatesInput, UserUncheckedUpdateWithoutAffiliatesInput>
    create: XOR<UserCreateWithoutAffiliatesInput, UserUncheckedCreateWithoutAffiliatesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAffiliatesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAffiliatesInput, UserUncheckedUpdateWithoutAffiliatesInput>
  }

  export type UserUpdateWithoutAffiliatesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutClientNestedInput
  }

  export type UserUncheckedUpdateWithoutAffiliatesInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutClientNestedInput
  }

  export type AffiliateReferralUpsertWithWhereUniqueWithoutAffiliateInput = {
    where: AffiliateReferralWhereUniqueInput
    update: XOR<AffiliateReferralUpdateWithoutAffiliateInput, AffiliateReferralUncheckedUpdateWithoutAffiliateInput>
    create: XOR<AffiliateReferralCreateWithoutAffiliateInput, AffiliateReferralUncheckedCreateWithoutAffiliateInput>
  }

  export type AffiliateReferralUpdateWithWhereUniqueWithoutAffiliateInput = {
    where: AffiliateReferralWhereUniqueInput
    data: XOR<AffiliateReferralUpdateWithoutAffiliateInput, AffiliateReferralUncheckedUpdateWithoutAffiliateInput>
  }

  export type AffiliateReferralUpdateManyWithWhereWithoutAffiliateInput = {
    where: AffiliateReferralScalarWhereInput
    data: XOR<AffiliateReferralUpdateManyMutationInput, AffiliateReferralUncheckedUpdateManyWithoutAffiliateInput>
  }

  export type AffiliateReferralScalarWhereInput = {
    AND?: AffiliateReferralScalarWhereInput | AffiliateReferralScalarWhereInput[]
    OR?: AffiliateReferralScalarWhereInput[]
    NOT?: AffiliateReferralScalarWhereInput | AffiliateReferralScalarWhereInput[]
    referral_id?: IntFilter<"AffiliateReferral"> | number
    client_id?: IntFilter<"AffiliateReferral"> | number
    affiliate_id?: IntFilter<"AffiliateReferral"> | number
    order_id?: IntFilter<"AffiliateReferral"> | number
    date_referred?: DateTimeFilter<"AffiliateReferral"> | Date | string
    commission_amount?: DecimalFilter<"AffiliateReferral"> | Decimal | DecimalJsLike | number | string
  }

  export type OrderUpsertWithWhereUniqueWithoutAffiliateInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutAffiliateInput, OrderUncheckedUpdateWithoutAffiliateInput>
    create: XOR<OrderCreateWithoutAffiliateInput, OrderUncheckedCreateWithoutAffiliateInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutAffiliateInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutAffiliateInput, OrderUncheckedUpdateWithoutAffiliateInput>
  }

  export type OrderUpdateManyWithWhereWithoutAffiliateInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutAffiliateInput>
  }

  export type PayoutUpsertWithWhereUniqueWithoutAffiliateInput = {
    where: PayoutWhereUniqueInput
    update: XOR<PayoutUpdateWithoutAffiliateInput, PayoutUncheckedUpdateWithoutAffiliateInput>
    create: XOR<PayoutCreateWithoutAffiliateInput, PayoutUncheckedCreateWithoutAffiliateInput>
  }

  export type PayoutUpdateWithWhereUniqueWithoutAffiliateInput = {
    where: PayoutWhereUniqueInput
    data: XOR<PayoutUpdateWithoutAffiliateInput, PayoutUncheckedUpdateWithoutAffiliateInput>
  }

  export type PayoutUpdateManyWithWhereWithoutAffiliateInput = {
    where: PayoutScalarWhereInput
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyWithoutAffiliateInput>
  }

  export type PayoutScalarWhereInput = {
    AND?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
    OR?: PayoutScalarWhereInput[]
    NOT?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
    payout_id?: IntFilter<"Payout"> | number
    affiliate_id?: IntFilter<"Payout"> | number
    amount?: DecimalFilter<"Payout"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Payout"> | string
    decline_reason?: StringNullableFilter<"Payout"> | string | null
    created_at?: DateTimeFilter<"Payout"> | Date | string
  }

  export type AffiliateCreateWithoutPayoutsInput = {
    name: string
    commissions_earned?: Decimal | DecimalJsLike | number | string
    available_balance?: Decimal | DecimalJsLike | number | string
    number_of_referrals?: number
    account_status?: string
    referral_link: string
    referral_code: string
    user: UserCreateNestedOneWithoutAffiliatesInput
    referrals?: AffiliateReferralCreateNestedManyWithoutAffiliateInput
    orders?: OrderCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateUncheckedCreateWithoutPayoutsInput = {
    affiliate_id?: number
    user_id: number
    name: string
    commissions_earned?: Decimal | DecimalJsLike | number | string
    available_balance?: Decimal | DecimalJsLike | number | string
    number_of_referrals?: number
    account_status?: string
    referral_link: string
    referral_code: string
    referrals?: AffiliateReferralUncheckedCreateNestedManyWithoutAffiliateInput
    orders?: OrderUncheckedCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateCreateOrConnectWithoutPayoutsInput = {
    where: AffiliateWhereUniqueInput
    create: XOR<AffiliateCreateWithoutPayoutsInput, AffiliateUncheckedCreateWithoutPayoutsInput>
  }

  export type AffiliateUpsertWithoutPayoutsInput = {
    update: XOR<AffiliateUpdateWithoutPayoutsInput, AffiliateUncheckedUpdateWithoutPayoutsInput>
    create: XOR<AffiliateCreateWithoutPayoutsInput, AffiliateUncheckedCreateWithoutPayoutsInput>
    where?: AffiliateWhereInput
  }

  export type AffiliateUpdateToOneWithWhereWithoutPayoutsInput = {
    where?: AffiliateWhereInput
    data: XOR<AffiliateUpdateWithoutPayoutsInput, AffiliateUncheckedUpdateWithoutPayoutsInput>
  }

  export type AffiliateUpdateWithoutPayoutsInput = {
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAffiliatesNestedInput
    referrals?: AffiliateReferralUpdateManyWithoutAffiliateNestedInput
    orders?: OrderUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateUncheckedUpdateWithoutPayoutsInput = {
    affiliate_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
    referrals?: AffiliateReferralUncheckedUpdateManyWithoutAffiliateNestedInput
    orders?: OrderUncheckedUpdateManyWithoutAffiliateNestedInput
  }

  export type OrderItemCreateWithoutProductInput = {
    quantity: number
    price_at_purchase: Decimal | DecimalJsLike | number | string
    order: OrderCreateNestedOneWithoutOrder_itemsInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    order_id: number
    quantity: number
    price_at_purchase: Decimal | DecimalJsLike | number | string
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    order_id?: IntFilter<"OrderItem"> | number
    product_id?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    price_at_purchase?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
  }

  export type UserCreateWithoutOrdersInput = {
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    affiliates?: AffiliateCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    user_id?: number
    email: string
    password_hash: string
    role: string
    created_at?: Date | string
    affiliates?: AffiliateUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type AffiliateCreateWithoutOrdersInput = {
    name: string
    commissions_earned?: Decimal | DecimalJsLike | number | string
    available_balance?: Decimal | DecimalJsLike | number | string
    number_of_referrals?: number
    account_status?: string
    referral_link: string
    referral_code: string
    user: UserCreateNestedOneWithoutAffiliatesInput
    referrals?: AffiliateReferralCreateNestedManyWithoutAffiliateInput
    payouts?: PayoutCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateUncheckedCreateWithoutOrdersInput = {
    affiliate_id?: number
    user_id: number
    name: string
    commissions_earned?: Decimal | DecimalJsLike | number | string
    available_balance?: Decimal | DecimalJsLike | number | string
    number_of_referrals?: number
    account_status?: string
    referral_link: string
    referral_code: string
    referrals?: AffiliateReferralUncheckedCreateNestedManyWithoutAffiliateInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateCreateOrConnectWithoutOrdersInput = {
    where: AffiliateWhereUniqueInput
    create: XOR<AffiliateCreateWithoutOrdersInput, AffiliateUncheckedCreateWithoutOrdersInput>
  }

  export type OrderItemCreateWithoutOrderInput = {
    quantity: number
    price_at_purchase: Decimal | DecimalJsLike | number | string
    product: ProductCreateNestedOneWithoutOrder_itemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    product_id: number
    quantity: number
    price_at_purchase: Decimal | DecimalJsLike | number | string
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type AffiliateReferralCreateWithoutOrderInput = {
    client_id: number
    date_referred?: Date | string
    commission_amount: Decimal | DecimalJsLike | number | string
    affiliate: AffiliateCreateNestedOneWithoutReferralsInput
  }

  export type AffiliateReferralUncheckedCreateWithoutOrderInput = {
    referral_id?: number
    client_id: number
    affiliate_id: number
    date_referred?: Date | string
    commission_amount: Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralCreateOrConnectWithoutOrderInput = {
    where: AffiliateReferralWhereUniqueInput
    create: XOR<AffiliateReferralCreateWithoutOrderInput, AffiliateReferralUncheckedCreateWithoutOrderInput>
  }

  export type AffiliateReferralCreateManyOrderInputEnvelope = {
    data: AffiliateReferralCreateManyOrderInput | AffiliateReferralCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliates?: AffiliateUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliates?: AffiliateUncheckedUpdateOneWithoutUserNestedInput
  }

  export type AffiliateUpsertWithoutOrdersInput = {
    update: XOR<AffiliateUpdateWithoutOrdersInput, AffiliateUncheckedUpdateWithoutOrdersInput>
    create: XOR<AffiliateCreateWithoutOrdersInput, AffiliateUncheckedCreateWithoutOrdersInput>
    where?: AffiliateWhereInput
  }

  export type AffiliateUpdateToOneWithWhereWithoutOrdersInput = {
    where?: AffiliateWhereInput
    data: XOR<AffiliateUpdateWithoutOrdersInput, AffiliateUncheckedUpdateWithoutOrdersInput>
  }

  export type AffiliateUpdateWithoutOrdersInput = {
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAffiliatesNestedInput
    referrals?: AffiliateReferralUpdateManyWithoutAffiliateNestedInput
    payouts?: PayoutUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateUncheckedUpdateWithoutOrdersInput = {
    affiliate_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
    referrals?: AffiliateReferralUncheckedUpdateManyWithoutAffiliateNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutAffiliateNestedInput
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type AffiliateReferralUpsertWithWhereUniqueWithoutOrderInput = {
    where: AffiliateReferralWhereUniqueInput
    update: XOR<AffiliateReferralUpdateWithoutOrderInput, AffiliateReferralUncheckedUpdateWithoutOrderInput>
    create: XOR<AffiliateReferralCreateWithoutOrderInput, AffiliateReferralUncheckedCreateWithoutOrderInput>
  }

  export type AffiliateReferralUpdateWithWhereUniqueWithoutOrderInput = {
    where: AffiliateReferralWhereUniqueInput
    data: XOR<AffiliateReferralUpdateWithoutOrderInput, AffiliateReferralUncheckedUpdateWithoutOrderInput>
  }

  export type AffiliateReferralUpdateManyWithWhereWithoutOrderInput = {
    where: AffiliateReferralScalarWhereInput
    data: XOR<AffiliateReferralUpdateManyMutationInput, AffiliateReferralUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderCreateWithoutOrder_itemsInput = {
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
    client: UserCreateNestedOneWithoutOrdersInput
    affiliate?: AffiliateCreateNestedOneWithoutOrdersInput
    referrals?: AffiliateReferralCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutOrder_itemsInput = {
    order_id?: number
    client_id: number
    affiliate_id?: number | null
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
    referrals?: AffiliateReferralUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutOrder_itemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutOrder_itemsInput, OrderUncheckedCreateWithoutOrder_itemsInput>
  }

  export type ProductCreateWithoutOrder_itemsInput = {
    product_name: string
    price: Decimal | DecimalJsLike | number | string
    cost_price?: Decimal | DecimalJsLike | number | string
    description?: string | null
    image?: string | null
    stock_quantity?: number
  }

  export type ProductUncheckedCreateWithoutOrder_itemsInput = {
    product_id?: number
    product_name: string
    price: Decimal | DecimalJsLike | number | string
    cost_price?: Decimal | DecimalJsLike | number | string
    description?: string | null
    image?: string | null
    stock_quantity?: number
  }

  export type ProductCreateOrConnectWithoutOrder_itemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrder_itemsInput, ProductUncheckedCreateWithoutOrder_itemsInput>
  }

  export type OrderUpsertWithoutOrder_itemsInput = {
    update: XOR<OrderUpdateWithoutOrder_itemsInput, OrderUncheckedUpdateWithoutOrder_itemsInput>
    create: XOR<OrderCreateWithoutOrder_itemsInput, OrderUncheckedCreateWithoutOrder_itemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutOrder_itemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutOrder_itemsInput, OrderUncheckedUpdateWithoutOrder_itemsInput>
  }

  export type OrderUpdateWithoutOrder_itemsInput = {
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    client?: UserUpdateOneRequiredWithoutOrdersNestedInput
    affiliate?: AffiliateUpdateOneWithoutOrdersNestedInput
    referrals?: AffiliateReferralUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutOrder_itemsInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: NullableIntFieldUpdateOperationsInput | number | null
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    referrals?: AffiliateReferralUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type ProductUpsertWithoutOrder_itemsInput = {
    update: XOR<ProductUpdateWithoutOrder_itemsInput, ProductUncheckedUpdateWithoutOrder_itemsInput>
    create: XOR<ProductCreateWithoutOrder_itemsInput, ProductUncheckedCreateWithoutOrder_itemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrder_itemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrder_itemsInput, ProductUncheckedUpdateWithoutOrder_itemsInput>
  }

  export type ProductUpdateWithoutOrder_itemsInput = {
    product_name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cost_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock_quantity?: IntFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateWithoutOrder_itemsInput = {
    product_id?: IntFieldUpdateOperationsInput | number
    product_name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cost_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock_quantity?: IntFieldUpdateOperationsInput | number
  }

  export type AffiliateCreateWithoutReferralsInput = {
    name: string
    commissions_earned?: Decimal | DecimalJsLike | number | string
    available_balance?: Decimal | DecimalJsLike | number | string
    number_of_referrals?: number
    account_status?: string
    referral_link: string
    referral_code: string
    user: UserCreateNestedOneWithoutAffiliatesInput
    orders?: OrderCreateNestedManyWithoutAffiliateInput
    payouts?: PayoutCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateUncheckedCreateWithoutReferralsInput = {
    affiliate_id?: number
    user_id: number
    name: string
    commissions_earned?: Decimal | DecimalJsLike | number | string
    available_balance?: Decimal | DecimalJsLike | number | string
    number_of_referrals?: number
    account_status?: string
    referral_link: string
    referral_code: string
    orders?: OrderUncheckedCreateNestedManyWithoutAffiliateInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutAffiliateInput
  }

  export type AffiliateCreateOrConnectWithoutReferralsInput = {
    where: AffiliateWhereUniqueInput
    create: XOR<AffiliateCreateWithoutReferralsInput, AffiliateUncheckedCreateWithoutReferralsInput>
  }

  export type OrderCreateWithoutReferralsInput = {
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
    client: UserCreateNestedOneWithoutOrdersInput
    affiliate?: AffiliateCreateNestedOneWithoutOrdersInput
    order_items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutReferralsInput = {
    order_id?: number
    client_id: number
    affiliate_id?: number | null
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
    order_items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutReferralsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutReferralsInput, OrderUncheckedCreateWithoutReferralsInput>
  }

  export type AffiliateUpsertWithoutReferralsInput = {
    update: XOR<AffiliateUpdateWithoutReferralsInput, AffiliateUncheckedUpdateWithoutReferralsInput>
    create: XOR<AffiliateCreateWithoutReferralsInput, AffiliateUncheckedCreateWithoutReferralsInput>
    where?: AffiliateWhereInput
  }

  export type AffiliateUpdateToOneWithWhereWithoutReferralsInput = {
    where?: AffiliateWhereInput
    data: XOR<AffiliateUpdateWithoutReferralsInput, AffiliateUncheckedUpdateWithoutReferralsInput>
  }

  export type AffiliateUpdateWithoutReferralsInput = {
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAffiliatesNestedInput
    orders?: OrderUpdateManyWithoutAffiliateNestedInput
    payouts?: PayoutUpdateManyWithoutAffiliateNestedInput
  }

  export type AffiliateUncheckedUpdateWithoutReferralsInput = {
    affiliate_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    commissions_earned?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    available_balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    number_of_referrals?: IntFieldUpdateOperationsInput | number
    account_status?: StringFieldUpdateOperationsInput | string
    referral_link?: StringFieldUpdateOperationsInput | string
    referral_code?: StringFieldUpdateOperationsInput | string
    orders?: OrderUncheckedUpdateManyWithoutAffiliateNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutAffiliateNestedInput
  }

  export type OrderUpsertWithoutReferralsInput = {
    update: XOR<OrderUpdateWithoutReferralsInput, OrderUncheckedUpdateWithoutReferralsInput>
    create: XOR<OrderCreateWithoutReferralsInput, OrderUncheckedCreateWithoutReferralsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutReferralsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutReferralsInput, OrderUncheckedUpdateWithoutReferralsInput>
  }

  export type OrderUpdateWithoutReferralsInput = {
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    client?: UserUpdateOneRequiredWithoutOrdersNestedInput
    affiliate?: AffiliateUpdateOneWithoutOrdersNestedInput
    order_items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutReferralsInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: NullableIntFieldUpdateOperationsInput | number | null
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    order_items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyClientInput = {
    order_id?: number
    affiliate_id?: number | null
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
  }

  export type OrderUpdateWithoutClientInput = {
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    affiliate?: AffiliateUpdateOneWithoutOrdersNestedInput
    order_items?: OrderItemUpdateManyWithoutOrderNestedInput
    referrals?: AffiliateReferralUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutClientInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: NullableIntFieldUpdateOperationsInput | number | null
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    order_items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    referrals?: AffiliateReferralUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutClientInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: NullableIntFieldUpdateOperationsInput | number | null
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AffiliateReferralCreateManyAffiliateInput = {
    referral_id?: number
    client_id: number
    order_id: number
    date_referred?: Date | string
    commission_amount: Decimal | DecimalJsLike | number | string
  }

  export type OrderCreateManyAffiliateInput = {
    order_id?: number
    client_id: number
    amount_paid: Decimal | DecimalJsLike | number | string
    order_date?: Date | string
    status: string
  }

  export type PayoutCreateManyAffiliateInput = {
    payout_id?: number
    amount: Decimal | DecimalJsLike | number | string
    status?: string
    decline_reason?: string | null
    created_at?: Date | string
  }

  export type AffiliateReferralUpdateWithoutAffiliateInput = {
    client_id?: IntFieldUpdateOperationsInput | number
    date_referred?: DateTimeFieldUpdateOperationsInput | Date | string
    commission_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order?: OrderUpdateOneRequiredWithoutReferralsNestedInput
  }

  export type AffiliateReferralUncheckedUpdateWithoutAffiliateInput = {
    referral_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    order_id?: IntFieldUpdateOperationsInput | number
    date_referred?: DateTimeFieldUpdateOperationsInput | Date | string
    commission_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralUncheckedUpdateManyWithoutAffiliateInput = {
    referral_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    order_id?: IntFieldUpdateOperationsInput | number
    date_referred?: DateTimeFieldUpdateOperationsInput | Date | string
    commission_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type OrderUpdateWithoutAffiliateInput = {
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    client?: UserUpdateOneRequiredWithoutOrdersNestedInput
    order_items?: OrderItemUpdateManyWithoutOrderNestedInput
    referrals?: AffiliateReferralUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutAffiliateInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    order_items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    referrals?: AffiliateReferralUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutAffiliateInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PayoutUpdateWithoutAffiliateInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    decline_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUncheckedUpdateWithoutAffiliateInput = {
    payout_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    decline_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUncheckedUpdateManyWithoutAffiliateInput = {
    payout_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    decline_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyProductInput = {
    order_id: number
    quantity: number
    price_at_purchase: Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUpdateWithoutProductInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    price_at_purchase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order?: OrderUpdateOneRequiredWithoutOrder_itemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    price_at_purchase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    order_id?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    price_at_purchase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type OrderItemCreateManyOrderInput = {
    product_id: number
    quantity: number
    price_at_purchase: Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralCreateManyOrderInput = {
    referral_id?: number
    client_id: number
    affiliate_id: number
    date_referred?: Date | string
    commission_amount: Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    price_at_purchase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product?: ProductUpdateOneRequiredWithoutOrder_itemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    product_id?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    price_at_purchase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    product_id?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    price_at_purchase?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralUpdateWithoutOrderInput = {
    client_id?: IntFieldUpdateOperationsInput | number
    date_referred?: DateTimeFieldUpdateOperationsInput | Date | string
    commission_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    affiliate?: AffiliateUpdateOneRequiredWithoutReferralsNestedInput
  }

  export type AffiliateReferralUncheckedUpdateWithoutOrderInput = {
    referral_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: IntFieldUpdateOperationsInput | number
    date_referred?: DateTimeFieldUpdateOperationsInput | Date | string
    commission_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AffiliateReferralUncheckedUpdateManyWithoutOrderInput = {
    referral_id?: IntFieldUpdateOperationsInput | number
    client_id?: IntFieldUpdateOperationsInput | number
    affiliate_id?: IntFieldUpdateOperationsInput | number
    date_referred?: DateTimeFieldUpdateOperationsInput | Date | string
    commission_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}