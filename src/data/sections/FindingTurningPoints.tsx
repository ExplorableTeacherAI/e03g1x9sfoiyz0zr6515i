import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { VisualOptionCards } from "@/components/organisms";

export const findingTurningPointsBlocks: ReactElement[] = [
    <StackLayout key="layout-turning-points-heading" maxWidth="xl">
        <Block id="turning-points-heading" padding="md">
            <EditableH2 id="h2-turning-points-heading" blockId="turning-points-heading">
                Finding the Turning Points
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-turning-points-definition" maxWidth="xl">
        <Block id="turning-points-definition" padding="sm">
            <EditableParagraph id="para-turning-points-definition" blockId="turning-points-definition">
                A turning point is where a curve stops climbing and starts falling, or the
                other way round. At that exact spot the gradient is zero, so we hunt for the{" "}
                <InlineFormula latex="x" /> values that make{" "}
                <InlineFormula latex="\frac{dy}{dx} = 0" />. Work through this example.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-turning-points-function" maxWidth="xl">
        <Block id="turning-points-function" padding="lg">
            <FormulaBlock latex="y = \frac{2x}{1 + x^2}" />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-turning-points-derivative-lead" maxWidth="xl">
        <Block id="turning-points-derivative-lead" padding="sm">
            <EditableParagraph id="para-turning-points-derivative-lead" blockId="turning-points-derivative-lead">
                Apply the quotient rule, then factorise the numerator. Always factorise:
                factors are what make the next steps easy.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-turning-points-derivative" maxWidth="xl">
        <Block id="turning-points-derivative" padding="lg">
            <FormulaBlock latex="\frac{dy}{dx} = \frac{-2(x - 1)(x + 1)}{(1 + x^2)^2}" />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-turning-points-solution" maxWidth="xl">
        <Block id="turning-points-solution" padding="sm">
            <EditableParagraph id="para-turning-points-solution" blockId="turning-points-solution">
                A fraction equals zero only when its numerator is zero, so{" "}
                <InlineFormula latex="\frac{dy}{dx} = 0" /> at{" "}
                <InlineFormula latex="x = 1" /> and <InlineFormula latex="x = -1" />.
                Putting those back into the original equation gives the turning points{" "}
                <InlineFormula latex="(1, 1)" /> and <InlineFormula latex="(-1, -1)" />. So
                which one is the peak and which is the valley?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-turning-points-visual" maxWidth="xl">
        <Block id="turning-points-visual" padding="sm">
            <VisualOptionCards
                blockId="turning-points-visual"
                intro="Pick how your students will meet turning points."
                cards={[
                    {
                        id: "tangent-walk",
                        title: "The curve with a tangent line students slide along it",
                        looks: "The curve of the example function on axes, with a straight tangent line resting on it and the gradient value shown as a number.",
                        manipulate: "Drag the tangent left and right along the curve.",
                        reveals: "The tangent is exactly flat, and the number reads zero, only at the two turning points.",
                        recommended: true,
                    },
                    {
                        id: "stacked-gradient",
                        title: "The curve and its gradient graph stacked one above the other",
                        looks: "Two graphs sharing the same x-axis: the function on top, its derivative below, with a vertical line crossing both.",
                        manipulate: "Move the vertical line across the pair.",
                        reveals: "The lower graph crosses zero at exactly the x values where the upper curve levels off.",
                    },
                    {
                        id: "factor-hunt",
                        title: "A number entry where students test x values against the factored derivative",
                        looks: "The factored derivative on screen with each factor shown separately, and a box to type an x value into.",
                        manipulate: "Type in x values and watch each factor's value appear.",
                        reveals: "The whole fraction is zero only when one of the top factors is zero.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
