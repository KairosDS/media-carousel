# \<media-carousel>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i media-carousel
```

## Usage and types

Import media carousel component

```html
<script type="module">
  import 'media-carousel/media-carousel.js';
</script>

```

### Autorun media carousel

It is necessary to pass the `autorun` attribute to the component. Inside the media-carousel tag we will create the list of elements that we want to show. This type of carousel is for images

```html
<media-carousel></media-carousel>
  <media-carousel autorun>
		<ul>
			<li>
				<img alt="logo client" src="../assets/logo-clients/azteca.svg" />
			</li>
			<li>
				<img alt="logo client" src="../assets/logo-clients/bankia.svg" />
			</li>
				<li>
				<img alt="logo client" src="../assets/logo-clients/bankinter.svg" />
			</li>
			<li>
				<img alt="logo client" src="../assets/logo-clients/bbva.svg" />
			</li>
			<li>
				<img alt="logo client" src="../assets/logo-clients/belcorp.svg" />
			</li>
		</ul>
</media-carousel>

```

### Manual media carousel

It is necessary to pass the `master` attribute to the component. Inside the media-carousel tag we will create the list of elements that we want to show. The behavior of the carousel is managed through two buttons, which will move the content forward or backward.
Content moves from start to finish.

```html
 <media-carousel master>
          <ul>
            <li>
              <p class="element1">2014</p>
            </li>
            <li>
              <p class="element2">2015</p>
            </li>
            <li>
              <p class="element3">2016</p>
            </li>
            <li>
              <p class="element4">2017</p>
            </li>
          
          </ul>
				</media-carousel>

```


### Manual media carousel with master and master-id

To have two or more related carousels, we have to pass to the component that will orchestrate the `master` and `id` attributes and to the component that will be orchestrated the `master-id` attribute with the same name to be able to relate them.

```html		
<media-carousel id="manualMobile" master>
	<ul>
		<li>
			<p>2014</p>
		</li>
		<li>
			<p>2015</p>
		</li>
		<li>
			<p>2016</p>
		</li>
		<li>
			<p>2017</p>
		</li>
	</ul>
</media-carousel>


<media-carousel master-id="manualMobile">
<ul>
	<li>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare condimentum sagittis. Cras varius vehicula consectetur. Sed sem elit, tristique eu lorem et, dignissim malesuada neque. Fusce sed velit ac felis ullamcorper fermentum. Nam facilisis consequat augue, condimentum tempor turpis suscipit quis.
		</p>
	</li>
	<li>
		<p>
			Sed tincidunt pretium enim, eget sodales ligula gravida et. Suspendisse et ipsum at erat aliquam tristique sed at elit. Proin in viverra augue. 
		</p>
	</li>
	<li>
		<p>
			Morbi massa nunc, egestas elementum scelerisque ut, fermentum vitae mi. Etiam id purus facilisis, porttitor dolor sed, semper dolor. Proin congue nunc tincidunt ex cursus, sed vulputate augue condimentum.
		</p>
	</li>
	<li>
		<p>
		In at libero ut tellus semper sagittis sed eget urna. In hac habitasse platea dictumst. Nullam dapibus, lacus ac luctus mollis, urna nibh auctor ligula, in aliquet dolor massa vel urna. Donec gravida iaculis nisi elementum varius.
		</p>
	</li>
</ul>
</media-carousel>
```

## Configuration and documentation media carousel component

#### Attributes
	- time
	- iconLeft
	- iconRight

#### Events
	- nextitemforlinked
	- previtemforlinked

#### CSS Properties
	- @cssproperty --text-color
	- @cssproperty --font-family
	- @cssproperty --font-size-s
	- @cssproperty --font-size-m

## Testing with Web Test Runner

To run the suite of Web Test Runner tests, run

```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
