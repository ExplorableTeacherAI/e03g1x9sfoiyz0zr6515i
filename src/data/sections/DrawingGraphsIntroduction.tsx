import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1, EditableParagraph, InlineFormula } from "@/components/atoms";

export const drawingGraphsIntroductionBlocks: ReactElement[] = [
    <StackLayout key="layout-introduction-title" maxWidth="xl">
        <Block id="introduction-title" padding="md">
            <EditableH1 id="h1-introduction-title" blockId="introduction-title">
                Drawing Graphs Using Differentiation
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-introduction-hook" maxWidth="xl">
        <Block id="introduction-hook" padding="sm">
            <EditableParagraph id="para-introduction-hook" blockId="introduction-hook">
                A roller-coaster designer never draws the track by plotting hundreds of
                points. They work out where it climbs, where it levels off at the top of a
                hill, and where it flattens out at the end. The shape follows from those
                few facts.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-introduction-promise" maxWidth="xl">
        <Block id="introduction-promise" padding="sm">
            <EditableParagraph id="para-introduction-promise" blockId="introduction-promise">
                Differentiation lets you do the same with an equation. Here you will take a
                function <InlineFormula latex="y = f(x)" />, work out{" "}
                <InlineFormula latex="\frac{dy}{dx}" /> and{" "}
                <InlineFormula latex="\frac{d^2y}{dx^2}" />, and use them to sketch the
                curve: where it turns, where it breaks, which way it slopes in between, and
                how it bends. You can already differentiate and use the quotient rule, so
                that part will feel familiar. The new skill is reading what those
                derivatives say about the shape.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
