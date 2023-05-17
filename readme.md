# <b>zonk</b>

<sup>Because <b>Zod + Stronk = Zonk</b> 💪</sup>

## Usage

Zonk creates ~~strongly typed~~ _strongly opinionated_ objects and arrays from your existing [Zod-schemas](https://www.github.com/colinhacks/zod).

Importing zonk extends your Zod object- and array schemas with the `.zonk()` method, which you can call with a valid input. You then receive a proxy that validates any changes to its children, ie. any mutation causes the schema to validate itself and its children.

## Example

```ts
import { z } from "zod";
import "zonk";

const zSchema = z.object({ arr: z.array(z.number()) });

const value = zSchema.zonk({ arr: [1, 2, 3] });

value.arr.push("This will throw an error 💥" as any);
```

## Plans

This was just an intrusive thought that needed to be toyed with for a couple of hours. I have no idea if it will go any further than that.
