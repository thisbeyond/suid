import { Theme } from "..";
import { InputProps } from "../Input";
import { MenuProps } from "../Menu";
import { OutlinedInputProps } from "../OutlinedInput";
import { SelectInputProps } from "./SelectInputProps";
import { SelectClasses } from "./selectClasses";
import { SxProps } from "@suid/system";
import * as ST from "@suid/types";
import { JSXElement } from "solid-js";

export type SelectTypeMap<P = {}, D extends ST.ElementType = "div", V = any> = {
  name: "MuiSelect";
  defaultPropNames:
    | "autoWidth"
    | "classes"
    | "defaultOpen"
    | "displayEmpty"
    | "IconComponent"
    | "multiple"
    | "native"
    | "variant";
  selfProps: {
    /**
     * If `true`, the width of the popover will automatically be set according to the items inside the
     * menu, otherwise it will be at least the width of the select input.
     * @default false
     */
    autoWidth?: boolean;

    /**
     * The option elements to populate the select with.
     * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
     *
     * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
     */
    children?: JSXElement;

    /**
     * Override or extend the styles applied to the component.
     * @default {}
     */
    classes?: Partial<SelectClasses>;

    /**
     * If `true`, the component is initially open. Use when the component open state is not controlled (i.e. the `open` prop is not defined).
     * You can only use it when the `native` prop is `false` (default).
     * @default false
     */
    defaultOpen?: boolean;

    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue?: V;

    /**
     * If `true`, a value is displayed even if no items are selected.
     *
     * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
     * returns the value to be displayed when no items are selected.
     *
     * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
     * The label should either be hidden or forced to a shrunk state.
     * @default false
     */
    displayEmpty?: boolean;

    /**
     * The icon that displays the arrow.
     * @default ArrowDropDownIcon
     */
    IconComponent?: ST.ElementType;

    /**
     * The `id` of the wrapper element or the `select` element when `native`.
     */
    id?: string;

    /**
     * An `Input` element; does not have to be a material-ui specific `Input`.
     */
    input?: JSXElement;

    /**
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
     * When `native` is `true`, the attributes are applied on the `select` element.
     */
    inputProps?: InputProps["inputProps"];

    /**
     * See [OutlinedInput#label](/api/outlined-input/#props)
     */
    label?: JSXElement;

    /**
     * The ID of an element that acts as an additional label. The Select will
     * be labelled by the additional label and the selected value.
     */
    labelId?: string;

    /**
     * Props applied to the [`Menu`](/api/menu/) element.
     */
    MenuProps?: Partial<MenuProps>;

    /**
     * If `true`, `value` must be an array and the menu will support multiple selections.
     * @default false
     */
    multiple?: boolean;

    /**
     * If `true`, the component uses a native `select` element.
     * @default false
     */
    native?: boolean;

    /**
     * Callback fired when a menu item is selected.
     *
     * @param {SelectChangeEvent<V>} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (any).
     * **Warning**: This is a generic event not a change event unless the change event is caused by browser autofill.
     * @param {object} [child] The react element that was selected when `native` is `false` (default).
     */
    onChange?: SelectInputProps<D, P, V>["onChange"];

    /**
     * Callback fired when the component requests to be closed.
     * Use in controlled mode (see open).
     *
     * @param {object} event The event source of the callback.
     */
    onClose?: (event: Event) => void;

    /**
     * Callback fired when the component requests to be opened.
     * Use in controlled mode (see open).
     *
     * @param {object} event The event source of the callback.
     */
    onOpen?: (event: Event) => void;

    /**
     * If `true`, the component is shown.
     * You can only use it when the `native` prop is `false` (default).
     */
    open?: boolean;

    /**
     * Render the selected value.
     * You can only use it when the `native` prop is `false` (default).
     *
     * @param {any} value The `value` provided to the component.
     * @returns {ReactNode}
     */
    renderValue?: (value: V) => JSXElement;

    /**
     * Props applied to the clickable div element.
     */
    SelectDisplayProps?: ST.PropsOf<"div">;

    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;

    /**
     * The `input` value. Providing an empty string will select no options.
     * Set to an empty string `''` if you don't want any of the available options to be selected.
     *
     * If the value is an object it must have reference equality with the option in order to be selected.
     * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
     */
    value?: V;

    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: "standard" | "outlined" | "filled";
  };
  props: P &
    SelectTypeMap<P, D, V>["selfProps"] &
    Omit<InputProps, "value" | "onChange"> &
    Omit<OutlinedInputProps, "value" | "onChange"> &
    Pick<SelectInputProps<D, P, V>, "onChange">;
  defaultComponent: D;
};

export type SelectProps<
  D extends ST.ElementType = SelectTypeMap["defaultComponent"],
  P = {}
> = ST.OverrideProps<SelectTypeMap<P, D>, D>;

export default SelectProps;
