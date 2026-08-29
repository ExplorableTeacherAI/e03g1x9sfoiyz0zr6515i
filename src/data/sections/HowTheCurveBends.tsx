import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { ConcavityComparison } from "./visuals/ConcavityComparison";
import { PracticeQuestions } from "./practice/PracticeQuestions";

export const howTheCurveBendsBlocks: ReactElement[] = [
    <StackLayout key="layout-bending-heading" maxWidth="xl">
        <Block id="bending-heading" padding="md">
            <EditableH2 id="h2-bending-heading" blockId="bending-heading">
                How the Curve Bends
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bending-setup" maxWidth="xl">
        <Block id="bending-setup" padding="sm">
            <EditableParagraph id="para-bending-setup" blockId="bending-setup">
                The first derivative says which way the curve slopes. The second says which
                way it bends. Differentiate again and factorise.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bending-second-derivative" maxWidth="xl">
        <Block id="bending-second-derivative" padding="lg">
            <FormulaBlock latex="\frac{d^2y}{dx^2} = \frac{4x(x - \sqrt{3})(x + \sqrt{3})}{(1 + x^2)^3}" />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bending-candidates" maxWidth="xl">
        <Block id="bending-candidates" padding="sm">
            <EditableParagraph id="para-bending-candidates" blockId="bending-candidates">
                Setting the numerator to zero gives <InlineFormula latex="x = -\sqrt{3}" />,{" "}
                <InlineFormula latex="x = 0" /> and <InlineFormula latex="x = \sqrt{3}" />.
                These are only candidates. An inflection needs the sign of{" "}
                <InlineFormula latex="\frac{d^2y}{dx^2}" /> to actually change there — and
                the coloured strips below show that sign across every range.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bending-visual" maxWidth="2xl">
        <Block id="bending-visual" padding="sm" hasVisualization>
            <ConcavityComparison />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bending-counterexample" maxWidth="xl">
        <Block id="bending-counterexample" padding="sm">
            <EditableParagraph id="para-bending-counterexample" blockId="bending-counterexample">
                Compare <InlineFormula latex="y = x^4" /> on the right. Its second derivative{" "}
                <InlineFormula latex="12x^2" /> is zero at <InlineFormula latex="x = 0" /> yet
                positive on both sides, so its strip never changes colour. That point is a
                minimum, not an inflection.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bending-practice" maxWidth="xl">
        <Block id="bending-practice" padding="sm">
            <PracticeQuestions
                items={[
                    {
                        id: "bending-sixth-power",
                        prompt: (
                            <>
                                For <InlineFormula latex="y = x^6" /> we get{" "}
                                <InlineFormula latex="\frac{d^2y}{dx^2} = 30x^4" />, which is zero
                                at <InlineFormula latex="x = 0" />. Is that a point of
                                inflection?
                            </>
                        ),
                        choices: [
                            {
                                id: "no",
                                label: "No — the sign does not change there",
                                correct: true,
                                feedback: "",
                            },
                            {
                                id: "yes-because-zero",
                                label: "Yes — the second derivative is zero there",
                                feedback:
                                    "That is the trap: a zero second derivative only makes a point a candidate. Substitute x = -1 and x = 1 into 30x⁴ — both give a positive answer. Slide the marker to x = 0 on the right-hand strip above and watch the colour stay the same.",
                            },
                            {
                                id: "cannot-tell",
                                label: "You cannot tell without the first derivative",
                                feedback:
                                    "The first derivative is not needed here. Test the sign of 30x⁴ just left and just right of zero and compare them.",
                            },
                        ],
                        correctFeedback:
                            "Exactly. An even power is positive on both sides, so the curve bends upwards throughout and never switches direction of bending.",
                    },
                    {
                        id: "bending-cubic-inflection",
                        prompt: (
                            <>
                                A curve has{" "}
                                <InlineFormula latex="\frac{d^2y}{dx^2} = 6x - 6" />. Type the x
                                value of its point of inflection.
                            </>
                        ),
                        answer: 1,
                        tolerance: 0.01,
                        correctFeedback:
                            "Correct. 6x - 6 = 0 gives x = 1, and the expression is negative to the left and positive to the right, so the bending genuinely flips.",
                        hints: [
                            "Not yet. Start by setting 6x - 6 equal to zero and solving for x.",
                            "Add 6 to both sides, then divide by 6. After that, check the sign at x = 0 and x = 2 to confirm it flips.",
                            "The answer is x = 1. At x = 0 the expression gives -6 and at x = 2 it gives +6, so the sign really does change.",
                        ],
                    },
                    {
                        id: "bending-negative-second-derivative",
                        prompt: (
                            <>
                                At a point where <InlineFormula latex="\frac{d^2y}{dx^2} < 0" />,
                                what is the curve doing?
                            </>
                        ),
                        choices: [
                            {
                                id: "bending-down",
                                label: "Bending downwards, like the top of a hill",
                                correct: true,
                                feedback: "",
                            },
                            {
                                id: "falling",
                                label: "Falling from left to right",
                                feedback:
                                    "That is what a negative first derivative tells you. The second derivative describes bending, not slope — a curve can be climbing while bending downwards.",
                            },
                            {
                                id: "at-maximum",
                                label: "Sitting at a maximum",
                                feedback:
                                    "Only if the first derivative is also zero there. A negative second derivative on its own describes the bending along a whole stretch of curve.",
                            },
                            {
                                id: "bending-up",
                                label: "Bending upwards, like a valley",
                                feedback:
                                    "Check the colours above: the orange stretches are where the second derivative is negative. Slide the marker into one and read the label.",
                            },
                        ],
                        correctFeedback:
                            "Yes. Negative means the gradient is decreasing as x grows, so the curve arches over — the orange stretches in the strips above.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
