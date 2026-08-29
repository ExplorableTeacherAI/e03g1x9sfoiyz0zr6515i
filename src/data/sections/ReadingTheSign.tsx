import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
                every turning point and every asymptote, which here gives three ranges:{" "}
                <InlineFormula latex="x < -1" />, <InlineFormula latex="-1 < x < 1" /> and{" "}
                <InlineFormula latex="x > 1" />.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sign-ranges-method" maxWidth="xl">
        <Block id="sign-ranges-method" padding="sm">
            <EditableParagraph id="para-sign-ranges-method" blockId="sign-ranges-method">
                In <InlineFormula latex="\frac{dy}{dx} = \frac{-2(x - 1)(x + 1)}{(1 + x^2)^2}" />{" "}
                the bottom is a square, so it is always positive. Only the top decides the
                sign. Take one easy test value from each range — say{" "}
                <InlineFormula latex="x = -2" />, <InlineFormula latex="x = 0" /> and{" "}
                <InlineFormula latex="x = 2" /> — and work out whether each factor is
                positive or negative.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sign-ranges-meaning" maxWidth="xl">
        <Block id="sign-ranges-meaning" padding="sm">
            <EditableParagraph id="para-sign-ranges-meaning" blockId="sign-ranges-meaning">
                A positive result means the curve is climbing there; a negative result
                means it is falling. Where the sign flips from negative to positive you
                have a minimum, and from positive to negative a maximum. Test all three
                ranges and the shape has nowhere left to hide.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sign-ranges-visual" maxWidth="xl">
        <Block id="sign-ranges-visual" padding="sm">
            <VisualOptionCards
                blockId="sign-ranges-visual"
                intro="Pick how your students will test the sign in each range."
                cards={[
                    {
                        id: "sign-table-builder",
                        title: "A sign table students fill in range by range",
                        looks: "A number line split at the two turning points, with an empty plus or minus box for each range and each factor.",
                        manipulate: "Choose plus or minus for every factor, then read off the sign of the whole derivative.",
                        reveals: "The matching piece of curve is drawn only once the sign is right, so a wrong sign gives a visibly wrong shape.",
                        targetsMisconception: "Students find where dy/dx = 0 but never check the sign either side",
                        recommended: true,
                    },
                    {
                        id: "test-value-machine",
                        title: "A test-value box that shows each factor's sign as students type",
                        looks: "The factored derivative with each bracket in its own coloured box, plus an entry field for x.",
                        manipulate: "Type any x value and watch each bracket turn positive or negative.",
                        reveals: "The sign of the whole fraction comes from multiplying the signs of the factors together.",
                    },
                    {
                        id: "gradient-walk",
                        title: "A tangent line that carries a running plus or minus label",
                        looks: "The curve with a tangent resting on it, labelled positive or negative according to its slope.",
                        manipulate: "Drag the tangent from far left to far right.",
                        reveals: "The label changes exactly at the turning points and nowhere else.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
