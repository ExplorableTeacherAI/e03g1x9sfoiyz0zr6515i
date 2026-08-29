import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { DenominatorComparison } from "./visuals/DenominatorComparison";
import { PracticeQuestions } from "./practice/PracticeQuestions";

export const framingTheCurveBlocks: ReactElement[] = [
    <StackLayout key="layout-framing-heading" maxWidth="xl">
        <Block id="framing-heading" padding="md">
            <EditableH2 id="h2-framing-heading" blockId="framing-heading">
                Framing the Curve
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-intercept" maxWidth="xl">
        <Block id="framing-intercept" padding="sm">
            <EditableParagraph id="para-framing-intercept" blockId="framing-intercept">
                Before drawing anything, pin down the edges of the picture. At{" "}
                <InlineFormula latex="x = 0" /> the example gives{" "}
                <InlineFormula latex="y = 0" />, so the curve passes through the origin.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-limits" maxWidth="xl">
        <Block id="framing-limits" padding="sm">
            <EditableParagraph id="para-framing-limits" blockId="framing-limits">
                Next ask what happens far out. Divide top and bottom by{" "}
                <InlineFormula latex="x^2" />: the top shrinks towards zero while the bottom
                heads to 1. That limit, <InlineFormula latex="y = 0" />, is the horizontal
                asymptote drawn as a green dotted line on both graphs below.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-limit-formula" maxWidth="xl">
        <Block id="framing-limit-formula" padding="lg">
            <FormulaBlock latex="\lim_{x \to +\infty} \frac{2x}{1 + x^2} = 0, \qquad \lim_{x \to -\infty} \frac{2x}{1 + x^2} = 0" />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-asymptotes" maxWidth="xl">
        <Block id="framing-asymptotes" padding="sm">
            <EditableParagraph id="para-framing-asymptotes" blockId="framing-asymptotes">
                Now the step that gets skipped most often: set the denominator to zero.
                Wherever the bottom vanishes, the curve has a vertical asymptote — a line it
                races towards but never crosses. Compare the two functions below and switch
                the dashed lines on.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-visual" maxWidth="2xl">
        <Block id="framing-visual" padding="sm" hasVisualization>
            <DenominatorComparison />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-comparison-note" maxWidth="xl">
        <Block id="framing-comparison-note" padding="sm">
            <EditableParagraph id="para-framing-comparison-note" blockId="framing-comparison-note">
                <InlineFormula latex="1 + x^2" /> is never zero, so the left curve is
                unbroken. <InlineFormula latex="1 - x^2" /> vanishes at{" "}
                <InlineFormula latex="x = \pm 1" />, tearing the right one into three.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-framing-practice" maxWidth="xl">
        <Block id="framing-practice" padding="sm">
            <PracticeQuestions
                items={[
                    {
                        id: "framing-asymptote-location",
                        prompt: (
                            <>
                                Where is the vertical asymptote of{" "}
                                <InlineFormula latex="y = \frac{x + 2}{x - 3}" />?
                            </>
                        ),
                        choices: [
                            {
                                id: "x-equals-three",
                                label: <InlineFormula latex="x = 3" />,
                                correct: true,
                                feedback: "",
                            },
                            {
                                id: "x-equals-minus-two",
                                label: <InlineFormula latex="x = -2" />,
                                feedback:
                                    "That is where the top is zero, which gives an x-intercept — the curve passes straight through it. The asymptote comes from the bottom of the fraction.",
                            },
                            {
                                id: "y-equals-one",
                                label: <InlineFormula latex="y = 1" />,
                                feedback:
                                    "That is the horizontal asymptote, found by letting x run to infinity. A vertical asymptote comes from the denominator instead.",
                            },
                            {
                                id: "no-asymptote",
                                label: "There is no vertical asymptote",
                                feedback:
                                    "Try setting x - 3 equal to zero. Switch the dashed lines on above and look at what a zero denominator does to a curve.",
                            },
                        ],
                        correctFeedback:
                            "Yes. At x = 3 the bottom is zero, so the value of y is undefined and the curve breaks there instead of crossing.",
                    },
                    {
                        id: "framing-quadratic-denominator",
                        prompt: (
                            <>
                                <InlineFormula latex="y = \frac{5}{x^2 - 16}" /> breaks at two x
                                values. Type the <strong>positive</strong> one.
                            </>
                        ),
                        answer: 4,
                        tolerance: 0.01,
                        correctFeedback:
                            "Correct. x² - 16 = 0 gives x = 4 and x = -4, so this curve has two vertical asymptotes rather than one.",
                        hints: [
                            "Not yet. The break happens where the bottom is zero, so solve x² - 16 = 0.",
                            "Move the 16 across: x² = 16. Now take the square root and keep the positive value.",
                            "The answer is x = 4, since 4² - 16 = 0. The other break is at x = -4.",
                        ],
                    },
                    {
                        id: "framing-limit-at-infinity",
                        prompt: (
                            <>
                                What does <InlineFormula latex="y = \frac{3x^2 + 1}{x^2 + 2}" />{" "}
                                approach as <InlineFormula latex="x \to +\infty" />?
                            </>
                        ),
                        choices: [
                            {
                                id: "three",
                                label: <InlineFormula latex="y \to 3" />,
                                correct: true,
                                feedback: "",
                            },
                            {
                                id: "zero",
                                label: <InlineFormula latex="y \to 0" />,
                                feedback:
                                    "That happens when the bottom grows faster than the top. Here both grow like x², so divide every term by x² and see what survives.",
                            },
                            {
                                id: "infinity",
                                label: <InlineFormula latex="y \to \infty" />,
                                feedback:
                                    "The bottom is growing just as fast as the top, so the fraction settles rather than runs away. Divide top and bottom by x² and try again.",
                            },
                            {
                                id: "half",
                                label: <InlineFormula latex="y \to \tfrac{1}{2}" />,
                                feedback:
                                    "That is the value at x = 0, not the value far out. Divide top and bottom by x² and let the small terms fall away.",
                            },
                        ],
                        correctFeedback:
                            "Yes. Dividing by x² gives (3 + 1/x²) over (1 + 2/x²); the small terms vanish and only 3 over 1 is left, so y = 3 is the horizontal asymptote.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
