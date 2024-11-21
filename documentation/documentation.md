- [addClass](#addclass)
- [append](#append)
- [appendSVG](#appendsvg)
- [computeTagHeight](#computetagheight)
- [computeTagWidth](#computetagwidth)
- [content](#content)
- [createSVGTag](#createsvgtag)
- [createTag](#createtag)
- [empty](#empty)
- [getTag](#gettag)
- [getTags](#gettags)
- [hasClass](#hasclass)
- [parse](#parse)
- [prepend](#prepend)
- [remove](#remove)
- [removeAll](#removeall)
- [removeAttrs](#removeattrs)
- [removeAttrsAll](#removeattrsall)
- [removeClass](#removeclass)
- [removeClassAll](#removeclassall)
- [setAttr](#setattr)
- [setAttrAll](#setattrall)
- [setProps](#setprops)
- [setPropsAll](#setpropsall)
- [supplantHTML](#supplanthtml)
- [toggleClass](#toggleclass)
- [Utils](#utils)

## addClass
Method to add a CSS class to a DOM element if it doesn't already have it.

**Arguments:**
- `tag`: (Element|string) - DOM element or selector string
- `cls`: (string) - CSS class name to add

**Returns:** dom object for chaining

## append
Method to append content to DOM elements.

**Arguments:**
- `selector`: (Element|string|NodeList|HTMLCollection|Array) - Target element(s) to append to
- `content`: (Element|string) - Content to append. If string, will be parsed as HTML
- `prepend`: (boolean) - Optional. If true, prepends instead of appends

**Returns:** dom object for chaining

## appendSVG
Method to append SVG content to DOM elements.

**Arguments:**
- `selector`: (Element|string) - Target element to append SVG to
- `content`: (Element|string) - SVG content to append. If string, will be wrapped in SVG tags
- `prepend`: (boolean) - Optional. If true, prepends instead of appends

## computeTagHeight
Method to compute total height of an element including padding and margins.

**Arguments:**
- `tag`: (Element) - DOM element to compute height for

**Returns:** Promise resolving to computed height (number)

## computeTagWidth
Method to compute total width of an element including padding and margins.

**Arguments:**
- `tag`: (Element) - DOM element to compute width for
- `parentTag`: (Element) - Optional parent element to include padding from

**Returns:** Promise resolving to computed width (number)

## content
Method to set content of DOM elements.

**Arguments:**
- `selector`: (Element|string|NodeList|HTMLCollection|Array) - Target element(s)
- `content`: (Element|string) - Content to set. If string, will be parsed as HTML
- `prepend`: (boolean) - Optional. If true, prepends instead of sets

**Returns:** dom object for chaining

## createSVGTag
Method to create an SVG element with specified configuration.

**Arguments:**
- `name`: (string) - SVG element tag name
- `config`: (Object) - Configuration object with properties:
  - `prop`: (Object) - Properties to set on element
  - `attr`: (Object) - Attributes to set on element
  - `event`: (Object) - Event listeners to attach
  - `children`: (Array) - Child SVG elements to create

**Returns:** Created SVG element

## createTag
Method to create an HTML element with specified configuration.

**Arguments:**
- `nameOrConfig`: (string|Object) - Tag name or configuration object containing:
  - `name`: (string) - Required. Element tag name
  - `text`: (string) - Optional. Text content
  - `class`: (string) - Optional. CSS classes
  - `prop`: (Object) - Optional. Properties to set
  - `attr`: (Object) - Optional. Attributes to set
  - `event`: (Object) - Optional. Event listeners
- `config`: (Object) - Optional configuration if first argument is string

**Returns:** Created HTML element

## empty
Method to empty contents of a DOM element.

**Arguments:**
- `selector`: (Element|string) - Target element to empty

**Returns:** dom object for chaining

## getTag
Method to get a single DOM element.

**Arguments:**
- `selector`: (Element|string) - Element or selector to find
- `parent`: (Element|string) - Optional parent element to search within

**Returns:** Found DOM element or original selector if not string

## getTags
Method to get multiple DOM elements.

**Arguments:**
- `selector`: (Element|string) - Element or selector to find
- `parent`: (Element|string) - Optional parent element to search within

**Returns:** HTMLCollection/NodeList of found elements or original selector if not string

## hasClass
Method to check if an element has a specific CSS class.

**Arguments:**
- `target`: (Element) - DOM element to check
- `className`: (string) - CSS class name to check for

**Returns:** boolean indicating if class exists

## parse
Method to parse an HTML string into DOM content.

**Arguments:**
- `stringHTML`: (string) - HTML string to parse

**Returns:** DocumentFragment containing parsed content

## prepend
Method to prepend content to DOM elements.

**Arguments:**
- `selector`: (Element|string) - Target element to prepend to
- `content`: (Element|string) - Content to prepend

**Returns:** dom object for chaining

## remove
Method to remove an element from the DOM.

**Arguments:**
- `selector`: (Element|string) - Element or selector to remove

**Returns:** dom object for chaining

**Private Functions:**
- `remove(ele)`: Helper function to remove a single element
  - `ele`: (Element) - Element to remove

## removeAll
Method to remove multiple elements from the DOM.

**Arguments:**
- `tagList`: (NodeList|HTMLCollection|Array) - List of elements to remove

## removeAttrs
Method to remove attributes from an element.

**Arguments:**
- `tagEle`: (Element|string) - Target element
- `attrs`: (Array) - Array of attribute names to remove

**Returns:** dom object for chaining

## removeAttrsAll
Method to remove attributes from multiple elements.

**Arguments:**
- `ele`: (Element|string) - Target elements
- `attrs`: (Array) - Array of attribute names to remove

**Returns:** dom object for chaining

## removeClass
Method to remove a CSS class from an element.

**Arguments:**
- `tag`: (Element|string) - Target element
- `cls`: (string) - CSS class to remove

**Returns:** dom object for chaining

## removeClassAll
Method to remove a CSS class from multiple elements.

**Arguments:**
- `tags`: (Array|Object) - Collection of elements
- `cls`: (string) - CSS class to remove

## setAttr
Method to set attributes on an element.

**Arguments:**
- `tagEle`: (Element|string) - Target element
- `attr`: (Object) - Key-value pairs of attributes to set

**Returns:** dom object for chaining

## setAttrAll
Method to set attributes on multiple elements.

**Arguments:**
- `ele`: (Element|string) - Target elements
- `attrs`: (Object) - Key-value pairs of attributes to set

**Returns:** dom object for chaining

## setProps
Method to set properties on an element.

**Arguments:**
- `ele`: (Element|string) - Target element
- `prop`: (Object) - Key-value pairs of properties to set

**Returns:** dom object for chaining

## setPropsAll
Method to set properties on multiple elements.

**Arguments:**
- `ele`: (Element|string) - Target elements
- `props`: (Object) - Key-value pairs of properties to set

**Returns:** dom object for chaining

## supplantHTML
Method to replace placeholders in HTML with data values.

**Arguments:**
- `html`: (string) - HTML string with {placeholders}
- `data`: (Object) - Data object with values to insert

**Returns:** String with replaced values

## toggleClass
Method to toggle a CSS class on an element.

**Arguments:**
- `tag`: (Element|string) - Target element
- `cls`: (string) - CSS class to toggle

**Returns:** dom object for chaining

## Utils
Utility functions used internally by DOM.JS.

**Public Methods:**
- `append(parent, content, prepend)`: Append/prepend content to parent element
- `appendChildAll(list, content, prepend)`: Append/prepend to multiple elements
- `createTagNS(name, namespace)`: Create element with namespace
- `getElement(selector)`: Get single element
- `getProperty(propertyName, object)`: Get nested object property
- `getStyleNumValue(style)`: Convert style px value to number
- `hasColon(string)`: Check if string contains colon
- `hasSingleClass(string)`: Check if selector is single class
- `hasSingleID(string)`: Check if selector is single ID
- `hasSingleTagName(string)`: Check if selector is single tag name
- `isArray(array)`: Check if value is array
- `isElement(element)`: Check if value is Element
- `isHTMLCollection(htmlCollection)`: Check if value is HTMLCollection
- `isNode(node)`: Check if value is Node
- `isNodeList(nodeList)`: Check if value is NodeList
- `isObject(value)`: Check if value is object
- `isString(value)`: Check if value is string
- `setEvent(tagEle, events)`: Set event listeners
- `singleHashChar(string)`: Check if string has single #
- `singlePeriodChar(string)`: Check if string has single .

[Back to top](#domjs-documentation)
