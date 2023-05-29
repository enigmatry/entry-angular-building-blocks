
# Text-related methods

From time to time we need to prettify and alter some text in HTML. Following methods help us in that.

## Text Modification

@use scss-foundation/src/modules/text/modification as text-modification;

- Capitalizes given string.
```
text-modification.capitalize('john'); // returns John
```

- Cuts off lengthy text by adding ellipsis in the end. Behavior heavily depends on context; it cannot be applied on containers with unlimited width.
```
@include text-modification.ellipsis();
```
This mixin is short-hand for following set of properties:
```
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
```
