/* jshint ignore:start */
/**
 * @jsx React.DOM
 */
// This file cannot be minified by CodeKit (yet)

/**
 * Setup the plugin
 */
var initId = "skills-safari";
var dataUrl = "data.json";
var dataPollInterval = 1000;

var classAreaItemDefault = "saf-area-item";
var classSkillsItemDefault = "saf-skills-item";
var classActive = "saf-active";
var classMore = "saf-more";
var classNoMore = "saf-no-more";

/**
 * Magic happens here.
 */
(function( saf, $ ) {

	Builder = React.createClass({
		getInitialState: function() {
			return {data: []};
		},

		loadData: function() {
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				success: function(data) {
					this.setState({data: data});
				}.bind(this)
			});
		},

		componentDidMount: function() {
			this.loadData();
			// setInterval(this.loadData, this.props.pollInterval);	// Use this to automatically reload data from data.json
		},

		render: function() {
			return (
				<div className="skills-safari">
					<Heading />
					<Areas data={this.state.data} />
					<Skills data={this.state.data} />
				</div>
			);
		}
	});

	var Heading = React.createClass({
		render: function() {
			return (
				<h1>Skills Safari (React)</h1>
			);
		}
	});

	/**
	 * Build class names for Areas and Skills, based on default area data.json)
	 */
	var buildClassName = function( that, data, classNameDefault ) {
		var cN = classNameDefault;
		var defaultArea = that.props.data[0].defaults[0]["area"];

		if ( data.area === defaultArea ) {
			cN += ' '+classActive;
		}

		return cN;
	}

	/**
	 * Areas
	 */
	var Areas = React.createClass({
		render: function() {
			var that = this; 

			var AreaList = this.props.data.map( function( data, i ) {
				return (
					data.areas.map( function( data, i ) {
						var cN = buildClassName(that, data, classAreaItemDefault);

						return (
							<li key={i} className={cN} data-group="@TODO">{data.text}</li>
						);
					})
				);
			});

			return (
				<ul className="saf-areas">
					{AreaList}
				</ul>
			);
		}
	});

	/**
	 * Skills
	 */
	var Skills = React.createClass({
		render: function() {
			var that = this;

			var SkillList = this.props.data.map( function( data, i ) {
				return (
					data.skills.map( function( data, i ) {
						var cN = buildClassName(that, data, classSkillsItemDefault);

						return (
							<li key={i} className={cN} data-group="@TODO">{data.text}</li>
						);
					})
				);
			});

			return (
				<ul className="saf-skills">
					{SkillList}
				</ul>
			);
		}
	});

	/**
	 * Initial rendering
	 */
	React.render(
		<Builder url={dataUrl} pollInterval={dataPollInterval} />,
		document.getElementById(initId)
	);

}( window.saf = window.saf || {}, jQuery ));
/* jshint ignore:end */