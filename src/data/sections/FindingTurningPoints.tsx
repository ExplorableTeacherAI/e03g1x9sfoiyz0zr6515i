import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { StackedGradientExplorer } from "./visuals/StackedGradientExplorer";
import { PracticeQuestions } from "./practice/PracticeQuestions";

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
                <InlineFormula latex="(1, 1)" /> and <InlineFormula latex="(-1, -1)" />.
                The two graphs below share an x-axis: the curve on top, its gradient
                underneath.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-turning-points-visual" maxWidth="xl">
        <Block id="turning-points-visual" padding="sm" hasVisualization>
            <StackedGradientExplorer />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-turning-points-reading" maxWidth="xl">
        <Block id="turning-points-reading" padding="sm">
            <EditableParagraph id="para-turning-points-reading" blockId="turning-points-reading">
                Drag the line across. Wherever the lower graph touches zero, the curve above
                has levelled off — and that happens at{" "}
                <InlineFormula latex="x = -1" /> and <InlineFormula latex="x = 1" />, nowhere
                else. Everywhere else the gradient sits clearly above or below the axis.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-turning-points-practice" maxWidth="xl">
        <Block id="turning-points-practice" padding="sm">
            <PracticeQuestions
                items={[
                    {
                        id: "turning-points-factors",
                        prompt: (
                            <>
                                A different curve has{" "}
                                <InlineFormula latex="\frac{dy}{dx} = \frac{4(x - 3)(x + 2)}{(1 + x^2)^2}" />
                                . At which x values does it have turning points?
                            </>
                        ),
                        choices: [
                            {
                                id: "three-and-minus-two",
                                label: <InlineFormula latex="x = 3 \text{ and } x = -2" />,
                                correct: true,
                                feedback: "",
                            },
                            {
                                id: "minus-three-and-two",
                                label: <InlineFormula latex="x = -3 \text{ and } x = 2" />,
                                feedback:
                                    "Close, but the signs are flipped. A bracket like (x - 3) is zero when x is +3, not -3. Set each bracket to zero on paper and solve it.",
                            },
                            {
                                id: "denominator-roots",
                                label: <InlineFormula latex="x = 1 \text{ and } x = -1" />,
                                feedback:
                                    "Those came from the bottom of the fraction. A fraction equals zero only when its numerator is zero, so look at the top brackets.",
                            },
                            {
                                id: "none",
                                label: "It has no turning points",
                                feedback:
                                    "It does have them. Ask yourself which x values make the top of the fraction equal to zero.",
                            },
                        ],
                        correctFeedback:
                            "Yes. Each bracket on the top gives its own turning point, because the whole fraction is zero as soon as one factor on top is zero.",
                    },
                    {
                        id: "turning-points-cubic",
                        prompt: (
                            <>
                                A curve has{" "}
                                <InlineFormula latex="\frac{dy}{dx} = 3x^2 - 12" />. Type the{" "}
                                <strong>positive</strong> x value of its turning point.
                            </>
                        ),
                        answer: 2,
                        tolerance: 0.01,
                        correctFeedback:
                            "Correct. Solving 3x^2 - 12 = 0 gives x^2 = 4, so the positive turning point is at x = 2 (and there is another at x = -2).",
                        hints: [
                            "Not yet. Start by setting the whole expression equal to zero, then get x^2 on its own.",
                            "Divide both sides by 3 first. That leaves x^2 = 4 — now take the square root and keep the positive value.",
                            "The answer is x = 2, because 3 times 4 minus 12 is zero. Check it by substituting back.",
                        ],
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
