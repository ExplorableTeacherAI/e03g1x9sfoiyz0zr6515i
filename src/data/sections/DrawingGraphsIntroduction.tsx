import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1, EditableParagraph, InlineFormula, Table } from "@/components/atoms";

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
    <StackLayout key="layout-introduction-routine-lead" maxWidth="xl">
        <Block id="introduction-routine-lead" padding="sm">
            <EditableParagraph id="para-introduction-routine-lead" blockId="introduction-routine-lead">
                Here is the whole routine in one place. Every section that follows works on
                one of these steps.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-introduction-routine" maxWidth="xl">
        <Block id="introduction-routine" padding="sm">
            <Table
                columns={[
                    { header: "Step", align: "center", width: 70 },
                    { header: "What you do" },
                ]}
                rows={[
                    {
                        cells: [
                            "1",
                            <>
                                Differentiate. Find{" "}
                                <InlineFormula latex="\frac{dy}{dx}" /> and{" "}
                                <InlineFormula latex="\frac{d^2y}{dx^2}" />, and write both
                                in factorised form.
                            </>,
                        ],
                    },
                    {
                        cells: [
                            "2",
                            <>
                                Turning points. Solve{" "}
                                <InlineFormula latex="\frac{dy}{dx} = 0" /> by setting the
                                numerator to zero, then find each matching y value.
                            </>,
                        ],
                    },
                    {
                        cells: [
                            "3",
                            <>
                                Frame the curve. Find y at{" "}
                                <InlineFormula latex="x = 0" />, the limits as{" "}
                                <InlineFormula latex="x \to \pm\infty" />, and the vertical
                                asymptotes where the denominator is zero.
                            </>,
                        ],
                    },
                    {
                        cells: [
                            "4",
                            <>
                                Sign of <InlineFormula latex="\frac{dy}{dx}" />. Split the
                                x-axis at those values and test each case: positive means
                                climbing, negative means falling. The pattern of signs also
                                tells you which turning points are maxima and which are
                                minima — negative then positive is a minimum, positive then
                                negative is a maximum.
                            </>,
                        ],
                    },
                    {
                        cells: [
                            "5",
                            <>
                                Sign of <InlineFormula latex="\frac{d^2y}{dx^2}" />. Solve it
                                equal to zero, test each range, and look for a sign change —
                                that marks a point of inflection.
                            </>,
                        ],
                    },
                    {
                        cells: [
                            "6",
                            "Sketch. Put the points, asymptotes, slopes and bends together into one curve.",
                        ],
                        highlight: true,
                        highlightColor: "#6366f1",
                    },
                ]}
                color="#6366f1"
                caption="The routine for sketching a curve from its derivatives"
            />
        </Block>
    </StackLayout>,
];
