"use client";
// Renders a validated UI definition. Because component props mirror the
// contracts, each node maps straight onto a component – no translation layer.
import { useId } from "react";
import { Alert, Badge, Button, Card, Checkbox, Form, Heading, SelectField, Stack, Text, TextField } from ".";
import type { UINode } from "@/lib/design-system/validate";

/** Which heading names the enclosing card (aria-labelledby). */
type Label = { id: string; heading: UINode };

/* eslint-disable @typescript-eslint/no-explicit-any */
function Node({ node, label }: { node: UINode; label?: Label }) {
  const p = (node.props ?? {}) as any;
  const kids = (node.children ?? []).map((k, i) => <Node key={i} node={k} label={label} />);
  switch (node.component) {
    case "Card":
      return <CardNode node={node} />;
    case "Stack":
      return <Stack {...p}>{kids}</Stack>;
    case "Form":
      return <Form {...p}>{kids}</Form>;
    case "Heading":
      return <Heading {...p} id={label?.heading === node ? label.id : undefined} />;
    case "Text":
      return <Text {...p} />;
    case "Badge":
      return <Badge {...p} />;
    case "Alert":
      return <Alert {...p} />;
    case "Button":
      return <Button {...p} />;
    case "TextField":
      return <TextField {...p} />;
    case "SelectField":
      return <SelectField {...p} />;
    case "Checkbox":
      return <Checkbox {...p} />;
    default:
      return null;
  }
}

function firstHeading(n: UINode): UINode | undefined {
  for (const k of n.children ?? []) {
    const found = k.component === "Heading" ? k : k.component === "Card" ? undefined : firstHeading(k);
    if (found) return found;
  }
}

function CardNode({ node }: { node: UINode }) {
  const id = useId();
  const heading = firstHeading(node);
  const label = heading ? { id, heading } : undefined;
  const p = (node.props ?? {}) as any;
  return (
    <Card {...p} labelledBy={heading ? id : undefined}>
      {(node.children ?? []).map((k, i) => <Node key={i} node={k} label={label} />)}
    </Card>
  );
}

export default function Renderer({ root }: { root: UINode }) {
  return <Node node={root} />;
}
