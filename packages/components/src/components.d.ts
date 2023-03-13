import * as components from './index';
declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        SButton: typeof components.Button;
        SBar: typeof components.Bar;
    }
}
export {};
