import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { VisualOptionCards } from "@/components/organisms";

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
                way it bends. Differentiate again and factorise, exactly as before.
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
                These are only candidates. A point of inflection needs the sign of{" "}
                <InlineFormula latex="\frac{d^2y}{dx^2}" /> to actually change there, so
                test the four ranges these values create.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bending-counterexample" maxWidth="xl">
        <Block id="bending-counterexample" padding="sm">
            <EditableParagraph id="para-bending-counterexample" blockId="bending-counterexample">
                Here is why the test matters. For <InlineFormula latex="y = x^4" /> we get{" "}
                <InlineFormula latex="\frac{d^2y}{dx^2} = 12x^2" />, which is zero at{" "}
                <InlineFormula latex="x = 0" /> but stays positive on both sides. No sign
                change, so no inflection — that point is a minimum.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-bending-visual" maxWidth="xl">
        <Block id="bending-visual" padding="sm">
            <VisualOptionCards
                blockId="bending-visual"
                intro="Pick how your students will test whether a candidate is really an inflection point."
                cards={[
                    {
                        id: "side-by-side-test",
                        title: "Two curves compared: one with a real inflection, one without",
                        looks: "The example curve and the fourth-power curve side by side, each with a strip underneath showing the sign of the second derivative.",
                        manipulate: "Move a marker through each candidate x value and watch the strip either flip colour or stay the same.",
                        reveals: "Only the curve whose strip changes colour has a genuine point of inflection.",
                        targetsMisconception: "Students assume the second derivative being zero always means a point of inflection",
                        recommended: true,
                    },
                    {
                        id: "concavity-shading",
                        title: "The curve shaded by which way it bends",
                        looks: "The curve drawn in two shades, one for bending upwards and one for bending downwards, with the boundary points marked.",
                        manipulate: "Toggle the shading on and off and hover each marked point.",
                        reveals: "Inflection points are exactly where the two shades meet.",
                    },
                    {
                        id: "rolling-tangent",
                        title: "A tangent line that rolls along and shows the curve crossing it",
                        looks: "The curve with a tangent line touching it at a movable point.",
                        manipulate: "Roll the tangent along the curve.",
                        reveals: "At an inflection point the curve crosses to the other side of its own tangent.",
                    },
                ]}
            />
        </Block>
    </StackLayout>,
];
