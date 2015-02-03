/* jshint ignore:start */
/**
 * @jsx React.DOM
 */
// This file cannot be minified by CodeKit (yet)

/**
 * Setup the plugin
 */
var initId = "skills-safari";
var areas = [
	a = "Interests",
	b = "Strategy/Marketing",
	c = "Design/Development",
];
var skills = [
	{ area: areas["a"], skill: "Interest 1" },
	{ area: areas["b"], skill: "Strategy/Marketing 1" },
	{ area: areas["a"], skill: "Interest 2" },
	{ area: areas["a"], skill: "Interest 3" },
	{ area: areas["b"], skill: "Strategy/Marketing 2" },
	{ area: areas["c"], skill: "Design/Development 1" },
];

/**
 * Magic happens here.
 */
(function( saf ) {
	Builder = React.createClass({
		render: function() {
			return (
				<div className="skills-safari">
					<Heading />
					<Areas areas={areas} />
					<Skills skills={skills} />
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
			var AreaList = this.props.areas.map( function( area ) {
				return (
					<li className="saf-area-item saf-active" data-group="@TODO">{area}</li>
				);
			});

			return (
				<ul className="saf-area">
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
			var SkillList = this.props.skills.map( function( data ) {
				return (
					<li className="saf-skills-item saf-active" data-group="@TODO">{data.skill}</li>
				);
			});

			return (
				<ul className="saf-area">
					{SkillList}
				</ul>
			);
		}
	});

	/**
	 * Initial rendering
	 */
	React.render(
		<Builder />,
		document.getElementById(initId)
	);

}( window.saf = window.saf || {} ));
/* jshint ignore:end */