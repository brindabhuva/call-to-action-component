/**
 * BLOCK: popup-component
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText,  InspectorControls, MediaUpload, MediaUploadCheck, AlignmentToolbar} = wp.blockEditor;
const { FormFileUpload, PanelBody, TextControl, TextareaControl  , PanelRow, Button } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-popup-component', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Call to Action' ), // Block title.
	icon: 'smiley', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes:{
		heading:{
			type: 'string',
		},
		description:{
			type: 'string',
		},
		imgId:{
			type: 'string',
		},
		imgUrl: {
			type: 'string',
			default: 'http://cosinabv.local/wp-content/uploads/2022/04/download-1-Copy.jpg'
		}
	 },
	 supports: {
		align: ['wide', 'full']
	},
	keywords: [
		__( 'popup-component' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		const { attributes, setAttributes  } = props;
		const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
		function selectImage(value) {
			console.log(value);
			setAttributes({
				imgUrl: value.sizes.full.url,
			})
		}
		// const selectImage = (value) => {
		// 	props.setAttributes({
		// 		imgId: value.id,
		// 		imgUrl: value.url,
		// 		imgSize: value.size
		// 	});
		// }
		const onSelectMedia = (media) => {
			props.setAttributes({
				imgId: media.id,
				imgUrl: media.url,
				imgSize: media.size
			});
		}
		const removeMedia = () => {
			props.setAttributes({
				imgId: 0,
				imgUrl: '',
				imgsize:''
			});
		}
		// Creates a <p class='wp-block-cgb-block-popup-component'></p>.
		return (
			
			<div className={alignmentClass}>
				<InspectorControls>
					<PanelBody
						title="popup component block settings"
						initialOpen={true}
					>
						<PanelRow>
						<MediaUploadCheck>
							{/* <MediaUpload 
								onSelect={selectImage}
								render={ ({open}) => {
									return <img 
										src={attributes.imgUrl}
										onClick={open}
										/>;
								}}
							/> */}
							<MediaUpload 
								onSelect={selectImage}
								value={attributes.imgId}
								allowedTypes={ ['image'] }
								render={ ({open}) => (
									<Button className={attributes.imgId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
									onClick={open} >Choose Image</Button>
									//  <img 
									// 	src={attributes.imgUrl}
									// 	onClick={open}
									// 	/>;
								)}
							/>
							
						</MediaUploadCheck>
						</PanelRow>
						<PanelRow>
						<img 
								src={attributes.imgUrl}
								onClick={open}
							/>
						</PanelRow>
						<PanelRow>
							{attributes.imgId != 0 && 
								<MediaUploadCheck>
									<Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'cgb')}</Button>
								</MediaUploadCheck>
								}
						</PanelRow>
						<PanelRow>
							<TextControl
								placeholder="Write your heading here"
								value={attributes.heading}
								onChange={(newtext) => setAttributes({ heading: newtext })}
							/>
							{/* <RichText 
								tagName="h4"
								placeholder="Write your heading here"
								value={attributes.heading}
								onChange={(newtext) => setAttributes({ heading: newtext })}
							/> */}
						</PanelRow>
						<PanelRow>
							<TextareaControl
								// style= "{border: 1px solid #000;}"
								placeholder="Description here"
								value={attributes.description}
								onChange={(newtext) => setAttributes({ description: newtext })}
							/>
							{/* <RichText 
								tagName="p"
								placeholder="Description here"
								value={attributes.description}
								onChange={(newtext) => setAttributes({ description: newtext })}
							/> */}
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<div class="section--cover section wf-section">
					<div class="container w-container">
						<div class="cover w-row">
							<div class="cover__hero w-col w-col-6">
								{/* <MediaUpload 
									onSelect={selectImage}
									render={ ({open}) => {
										return <img 
											src={attributes.imgUrl}
											onClick={open}
											class="cover-img"
											/>;
									}}
								/> */}
								<img src={attributes.imgUrl} class="cover-img"/>

								{/* <img src={props.attributes.imgURL} class='cover-img 1111'/> */}
							</div>
							<div class="cover__content w-col w-col-6">
								<RichText 
									tagName="h1"
									class="cover-heading"
									placeholder="Write your heading here"
									value={attributes.heading}
									onChange={(newtext) => setAttributes({ heading: newtext })}
								/>
								<RichText 
									tagName="p"
									class="cover-text"
									placeholder="Description here"
									value={attributes.description}
									onChange={(newtext) => setAttributes({ description: newtext })}
								/>
								<div class="w-layout-grid grid">
									<a id="w-node-e351d9bd-0230-f0a6-5329-59bea7a3bd2a-adb90638" href="#" class="button btn-primary w-button">Read More</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>			
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		const { attributes } = props;
		const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
		return (
			<div className={alignmentClass}>
				<div class="section--cover section wf-section">
					<div class="container w-container">
						<div class="cover w-row">
							<div class="cover__hero w-col w-col-6">
								<img src={attributes.imgUrl} class="cover-img"/>
								{/* <img src={props.attributes.imgURL} class='cover-img'/> */}
							</div>
						<div class="cover__content w-col w-col-6">
							<RichText.Content 
								tagName="h2"
								class="cover-heading"
								value={attributes.heading}
							/>
							<RichText.Content
									tagName="p"
									class="cover-text"
									value={attributes.description}
								/>
						<div class="w-layout-grid grid">
									<a id="w-node-e351d9bd-0230-f0a6-5329-59bea7a3bd2a-adb90638" href="#" class="button btn-primary w-button">Read More</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>			
		);
	},
} );
