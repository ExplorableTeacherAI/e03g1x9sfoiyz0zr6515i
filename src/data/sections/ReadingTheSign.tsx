import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { SignTableBuilder } from "./visuals/SignTableBuilder";
import { PracticeQuestions } from "./practice/PracticeQuestions";

export const readingTheSignBlocks: ReactElement[] = [
    <StackLayout key="layout-sign-ranges-heading" maxWidth="xl">
        <Block id="sign-ranges-heading" padding="md">
            <EditableH2 id="h2-sign-ranges-heading" blockId="sign-ranges-heading">
                Reading the Sign in Each Range
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sign-ranges-setup" maxWidth="xl">
        <Block id="sign-ranges-setup" padding="sm">
            <EditableParagraph id="para-sign-ranges-setup" blockId="sign-ranges-setup">
                Knowing that <InlineFormula latex="\frac{dy}{dx} = 0" /> at{" "}
                <InlineFormula latex="x = -1" /> and <InlineFormula latex="x = 1" /> does
                not tell you which is a maximum. For that you must test the sign of{" "}
                <InlineFormula latex="\frac{dy}{dx}" /> on both sides. Cut the x-axis at
                every turning point and every asymptote, giving five cases to check:{" "}
                <InlineFormula latex="x < -1" />, <InlineFormula latex="x = -1" />,{" "}
                <InlineFormula latex="-1 < x < 1" />, <InlineFormula latex="x = 1" /> and{" "}
                <InlineFormula latex="x > 1" />.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sign-ranges-method" maxWidth="xl">
        <Block id="sign-ranges-method" padding="sm">
            <EditableParagraph id="para-sign-ranges-method" blockId="sign-ranges-method">
                In <InlineFormula latex="\frac{dy}{dx} = \frac{-2(x - 1)(x + 1)}{(1 + x^2)^2}" />{" "}
                the bottom is a square, so it is always positive. Only the top decides the
                sign. Choose the sign of each bracket in every case below — the boundary
                rows take the value zero — and the curve draws itself as you go.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sign-ranges-meaning" maxWidth="xl">
        <Block id="sign-ranges-meaning" padding="sm">
            <EditableParagraph id="para-sign-ranges-meaning" blockId="sign-ranges-meaning">
                Positive means the curve is climbing, negative means it is falling. A flip
                from negative to positive is a minimum; positive to negative is a maximum.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sign-ranges-visual" maxWidth="2xl">
        <Block id="sign-ranges-visual" padding="sm" hasVisualization>
            <SignTableBuilder />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sign-ranges-practice" maxWidth="xl">
        <Block id="sign-ranges-practice" padding="sm">
            <PracticeQuestions
                items={[
                    {
                        id: "sign-ranges-single-value",
                        prompt: (
                            <>
                                A curve has{" "}
                                <InlineFormula latex="\frac{dy}{dx} = (x - 2)(x - 5)" />. At{" "}
                                <InlineFormula latex="x = 3" />, is the curve climbing or
                                falling?
                            </>
                        ),
                        choices: [
                            {
                                id: "falling",
                                label: "Falling — the gradient is negative",
                                correct: true,
                                feedback: "",
                            },
                            {
                                id: "climbing",
                                label: "Climbing — the gradient is positive",
                                feedback:
                                    "Check each bracket separately: (3 - 2) is positive but (3 - 5) is negative, and a positive times a negative is negative.",
                            },
                            {
                                id: "flat",
                                label: "Flat — the gradient is zero",
                                feedback:
                                    "The gradient is zero only when a bracket is zero, which happens at x = 2 and x = 5. At x = 3 neither bracket vanishes.",
                            },
                        ],
                        correctFeedback:
                            "Yes. (3 - 2) is positive and (3 - 5) is negative, so their product is negative — the curve is falling between the two stationary points.",
                    },
                    {
                        id: "sign-ranges-repeated-factor",
                        prompt: (
                            <>
                                A curve has{" "}
                                <InlineFormula latex="\frac{dy}{dx} = (x - 4)^2" />, which is
                                zero at <InlineFormula latex="x = 4" />. Is that point a
                                maximum, a minimum, or neither?
                            </>
                        ),
                        choices: [
                            {
                                id: "neither",
                                label: "Neither — the curve keeps climbing through it",
                                correct: true,
                                feedback: "",
                            },
                            {
                                id: "minimum",
                                label: "A minimum",
                                feedback:
                                    "You found the zero but did not test either side of it. Put x = 3 and x = 5 into (x - 4)²: both give a positive gradient, so the curve never turns around. Build a sign table for it above and see.",
                            },
                            {
                                id: "maximum",
                                label: "A maximum",
                                feedback:
                                    "A maximum needs the gradient to change from positive to negative. Test x = 3 and x = 5 in (x - 4)² and compare the two signs before deciding.",
                            },
                        ],
                        correctFeedback:
                            "Exactly. A square is never negative, so the gradient is positive on both sides — the curve flattens for an instant and carries on climbing. A zero gradient alone proves nothing.",
                    },
                    {
                        id: "sign-ranges-identify-maximum",
                        prompt: (
                            <>
                                A curve has{" "}
                                <InlineFormula latex="\frac{dy}{dx} = (x + 1)(x - 3)" />, so the
                                gradient is zero at <InlineFormula latex="x = -1" /> and{" "}
                                <InlineFormula latex="x = 3" />. Which one is the maximum?
                            </>
                        ),
                        choices: [
                            {
                                id: "minus-one",
                                label: <InlineFormula latex="x = -1" />,
                                correct: true,
                                feedback: "",
                            },
                            {
                                id: "three",
                                label: <InlineFormula latex="x = 3" />,
                                feedback:
                                    "Test each side of x = 3: at x = 0 the gradient is negative and at x = 4 it is positive. Falling then climbing is a minimum, not a maximum.",
                            },
                            {
                                id: "both",
                                label: "Both of them",
                                feedback:
                                    "A curve cannot peak twice in a row without dipping between. Work out the sign of the gradient at x = -2, x = 0 and x = 4 and follow the pattern.",
                            },
                        ],
                        correctFeedback:
                            "Correct. At x = -2 the gradient is positive and at x = 0 it is negative, so the curve climbs to x = -1 and then falls away — a maximum.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
