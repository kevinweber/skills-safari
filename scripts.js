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
			this.loadData;
			setInterval(this.loadData, this.props.pollInterval);
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
	 * Areas
	 */
	var Areas = React.createClass({
		render: function() {
			var AreaList = this.props.data.map( function( data, i ) {
				return (
					data.areas.map( function( data, i ) {
						return (
							<li key={i} className="saf-area-item saf-active" data-group="@TODO">{data.text}</li>
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
			var SkillList = this.props.data.map( function( data, i ) {
				return (
					data.skills.map( function( data, i ) {
						return (
							<li key={i} className="saf-skills-item saf-active" data-group="@TODO">{data.text}</li>
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