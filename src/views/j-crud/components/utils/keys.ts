import type { InjectionKey, DeepReadonly, Ref, ComputedRef } from 'vue'
import { type TableInstance } from "element-plus";
import type { JCrudOptionType } from "../jCrud.d.ts";

export const JCrudOptionKey = Symbol('optionKey') as InjectionKey<DeepReadonly<JCrudOptionType>>;

export const getPropKey = Symbol('getPropKey') as InjectionKey<Function>;

export const getColumnSlotsKey = Symbol('getColumnSlotsKey') as InjectionKey<ComputedRef<Record<string, Function>>>;

export const getElTableRefKey = Symbol('getElTableRefKey') as InjectionKey<Ref<TableInstance>>

export const getEmitKey = Symbol('getEmitKey') as InjectionKey<{(e: 'sortable-change', oldIndex: number | undefined, newIndex: number | undefined): void;}>

