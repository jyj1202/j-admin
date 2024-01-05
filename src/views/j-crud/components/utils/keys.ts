import type { InjectionKey, DeepReadonly, Ref } from 'vue'
import { type TableInstance } from "element-plus";
import type { JCrudOptionType, JCrudColumn } from "../jCrud.d.ts";

export const JCrudOptionKey = Symbol('optionKey') as InjectionKey<DeepReadonly<JCrudOptionType>>;

export const getPropKey = Symbol('getPropKey') as InjectionKey<Function>;

export const getColumnSlotsKey = Symbol('getColumnSlotsKey') as InjectionKey<JCrudColumn>;

export const getElTableRefKey = Symbol('getElTableRefKey') as InjectionKey<Ref<TableInstance|null>>

export const getEmitKey = Symbol('getEmitKey') as InjectionKey<{(e: 'sortable-change', oldIndex: number | undefined, newIndex: number | undefined): void;}>

