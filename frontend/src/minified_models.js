class Context {
  constructor (props) {
    for(let k in props) {
      this[k] = props[k];
    }
  }

  tollensCheck () {
    console.log("Begin tollens check for " + conditional.id);
    const consequent_ids = conditional.consequent_ids;
    const consequent_disjunction_ids = conditional.consequent_disjunction_ids;

    // propositions
    for(let id of consequent_ids) {
      const proposition = _this.propositions[id];
      if (proposition.truth_value !== undefined && proposition.truth_value !== conditional.consequent_truth_values[id]) {
        console.log("Modus tollens found for conditional " + conditional.id);
        this.updateAntecedents(conditional);
        return true;
      }
    }

    // disjunctions
    for (let id of consequent_disjunction_ids) {
      const disjunction = this.disjunctions[id];
      if (disjunction.truth_value !== undefined && disjunction.truth_value !== conditional.disjunction_truth_values[id]) {
        console.log(`Modus tollens found for conditional ${conditional.id}`);
        this.updateAntecedents(conditional);
        return true;
      }
    }

    console.log(`No modus tollens for conditional ${conditional.id}`);
    return false;
  }
   
  conditionalEvaluation = (proposition) => {
    console.log(`Begin conditionalEvaluation for proposition ${proposition.id}`)
    if (!proposition || proposition.truth_value === null) {
      console.log("Invalid: No proposition or truth value")
      return 
    }
    
    proposition.antecedent_ids.forEach((id) => {
      const conditional = this.conditionals[id];
      this.ponensCheck(conditional);
    });
    
    proposition.consequent_ids.forEach((id) => {
      const conditional = this.conditionals[id];
      this.tollensCheck(conditional);
    });
  }

    this.setPropositionTruthValue = function (proposition, truth_value) {
      proposition.truth_value = truth_value;
      proposition.user = true;
      _this.conditionalEvaluation(proposition);
      _this.propositionsDisjunctionEvaluation(proposition);
      _this.forceUpdate();
    };

    this.propositionsDisjunctionEvaluation = function (proposition) {
      console.log("Begin proposition disjunction evaluation for proposition " + proposition.id);
      proposition.disjunction_ids.forEach(function (id) {
        var disjunction = _this.disjunctions[id];
        _this.disjunctionEvaluation(disjunction);
      });
    };

    this.disjunctionEvaluation = function (disjunction) {
      var isUser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      console.log("Begin disjunction evaluation for disjunction " + disjunction.id);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = disjunction.disjunct_ids[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var id = _step3.value;

          console.log(id);
          var disjunct = _this.propositions[id];
          // if (!disjunct) {
          //   debugger
          // }
          var truth_value = disjunction.disjunct_truth_values[id];
          if (disjunct.truth_value === truth_value) {
            console.log("Disjunction " + disjunction.id + " obtains");
            disjunction.truth_value = true;
            disjunction.user = isUser;
            console.log("Begin modus and tollens check for disjunction " + disjunction.id);
            // Update disjunctions
            _this.ponensCheckDisjunction(disjunction);
            _this.tollensCheckDisjunction(disjunction);
            return true;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      console.log("No updates necessary for disjunction " + disjunction.id);
      return true;
    };

    for (var k in props) {
      this[k] = props[k];
    }
  }

  // Checks whether all antecedents of a conditional obtain. 


  _createClass(Context, [{
    key: "ponensCheck",
    value: function ponensCheck(conditional) {
      console.log("Checking whether antecedents obtain for " + conditional.id);
      // proposition
      var antecedent_ids = conditional.antecedent_ids;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = antecedent_ids[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var id = _step4.value;

          var proposition = this.propositions[id];
          if (proposition.truth_value !== conditional.antecedent_truth_values[id]) {
            console.log("proposition antecedent did not obtain for conditional " + conditional.id);
            return false;
          }
        }

        // disjunction
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var antecedent_disjunction_ids = conditional.antecedent_disjunction_ids;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = antecedent_disjunction_ids[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _id2 = _step5.value;

          var disjunction = this.disjunctions[_id2];
          if (disjunction.truth_value !== conditional.disjunction_truth_values[_id2]) {
            console.log("disjunction antecedent did not obtain for conditional " + conditional.id);
            return false;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      console.log("Antecedents obtained for conditional " + conditional.id);
      this.updateConsequents(conditional);
      return true;
    }

    // TODO handle two conjunct tollens case (a && b => c. ~c => ~a || ~b)

  }, {
    key: "updateAntecedents",
    value: function updateAntecedents(conditional) {
      console.log("Updating antecedents for conditional: " + conditional.id);
      // propositions
      var antecedent_ids = conditional.antecedent_ids;
      var antecedent_disjunction_ids = conditional.antecedent_disjunction_ids;

      if (antecedent_ids.length === 1) {
        var id = antecedent_ids[0];
        var proposition = this.propositions[id];
        var truth_value = conditional.antecedent_truth_values[id];
        proposition.truth_value = !truth_value;
        proposition.user = false;
        this.conditionalEvaluation(proposition);
        this.propositionsDisjunctionEvaluation(proposition);
      } else if (antecedent_disjunction_ids.length === 1) {
        var _id3 = antecedent_disjunction_ids[0];
        var disjunction = this.disjunctions[_id3];
        var _truth_value = conditional.disjunction_truth_values[_id3];
        disjunction.truth_value = !_truth_value;
        disjunction.user = false;
        this.disjunctionEvaluation(disjunction, false);
      } else {
        // Handle a && b
        // TODO: ignores a && (b || c)
        debugger;
        if (antecedent_ids.length > 0) {

          var newDisjunction = { id: Object.keys(this.disjunctions).length * -1 };
          var newConditional = { id: Object.keys(this.conditionals).length * -1 };
          newDisjunction.disjunct_ids = antecedent_ids.slice();
          newDisjunction.antecedent_ids = [];
          newDisjunction.consequent_ids = [newConditional.id];
          newDisjunction.disjunct_truth_values = {};

          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = antecedent_ids[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var _id4 = _step6.value;

              newDisjunction.disjunct_truth_values[_id4] = !conditional.antecedent_truth_values[_id4];
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }

          this.disjunctions[newDisjunction.id] = newDisjunction;

          newConditional.truth_value = true;
          newConditional.consequent_disjunction_ids = [newDisjunction.id];
          newConditional.antecedent_ids = conditional.consequent_ids.slice();
          newConditional.antecedent_disjunction_ids = conditional.antecedent_disjunction_ids.slice();
          newConditional.antecedent_truth_values = conditional.consequent_truth_values;
          newConditional.disjunction_truth_values = newConditional.disjunction_truth_values;

          this.conditionals[newConditional.id] = newConditional;
        }
      }
    }

    // Handle disjunctions
    // Updates consequents to conditionals' consequent truth_values

  }, {
    key: "updateConsequents",
    value: function updateConsequents(conditional) {
      console.log("Updating consequents for conditional: " + conditional.id);
      var consequent_ids = conditional.consequent_ids;
      var consequent_disjunction_ids = conditional.consequent_disjunction_ids;
      var propositionNum = 0;

      // propositions
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = consequent_ids[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var id = _step7.value;

          var proposition = this.propositions[id];
          if (proposition.truth_value !== conditional.consequent_truth_values[id]) {
            proposition.truth_value = conditional.consequent_truth_values[id];
            proposition.user = false;
            this.forceUpdate();

            console.log("Updated consequent " + proposition.id + " to " + proposition.truth_value);
            propositionNum++;
            this.conditionalEvaluation(proposition);
            this.propositionsDisjunctionEvaluation(proposition);
          }
        }

        // disjunctions
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = consequent_disjunction_ids[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _id5 = _step8.value;

          var disjunction = this.disjunctions[_id5];
          if (disjunction.truth_value !== conditional.disjunction_truth_values[_id5]) {
            disjunction.truth_value = conditional.disjunction_truth_values[_id5];
            disjunction.user = false;
            this.forceUpdate();
            console.log("Updated consequent disjunction " + disjunction.id + " to " + disjunction.truth_value);
            propositionNum++;
            this.disjunctionEvaluation(disjunction, false);
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      console.log(propositionNum + " consequents updated for conditional " + conditional.id);
      return true;
    }

    // User sets proposition truth value

  }, {
    key: "ponensCheckDisjunction",
    value: function ponensCheckDisjunction(disjunction) {
      var _this2 = this;

      disjunction.antecedent_ids.forEach(function (id) {
        return _this2.ponensCheck(_this2.conditionals[id]);
      });
    }
  }, {
    key: "tollensCheckDisjunction",
    value: function tollensCheckDisjunction(disjunction) {
      var _this3 = this;

      disjunction.consequent_ids.forEach(function (id) {
        return _this3.tollensCheck(_this3.conditionals[id]);
      });
    }
  }]);

  return Context;
}();

/**
 * Proposition
 * @param statement text
 * @param truth_value boolean
 * @param consequent_ids array of ids to conditionals where proposition is a consequent
 * @param antecedent_ids array of ids to conditionals where proposition is a antecedent
 * @param disjunctions array of ids to disjunctions where proposition is a disjunct
 */


var Proposition = function Proposition(props) {
  _classCallCheck(this, Proposition);

  var statement = props.statement,
      consequent_ids = props.consequent_ids,
      antecedent_ids = props.antecedent_ids;

  this.statement = statement;
  this.truth_value = null;
  this.consequent_ids = consequent_ids;
  this.antecedent_ids = antecedent_ids;
};

/**
 * Conditional
 * @param truth_value boolean
 * @param antecedent_ids array of ids
 * @param consequent_ids array of ids
 * @param antecedent_truth_values map of proposition ids to truth_values
 * @param consequent_truth_values map of proposition ids to truth_values
 */


var Conditional = function Conditional(props) {
  _classCallCheck(this, Conditional);

  var truth_value = props.truth_value,
      antecedent_ids = props.antecedent_ids,
      consequent_ids = props.consequent_ids,
      proposition_truth_values = props.proposition_truth_values;

  this.truth_value = truth_value;
  this.antecedent_ids = antecedent_ids;
  this.consequent_ids = consequent_ids;
  this.proposition_truth_values = proposition_truth_values;
};

/**
 * Disjunction
 * @param truth_value boolean
 * @param disjunct_ids array of ids
 * @param disjunct_truth_values map of disjunct ids to truth_values
 */


var Disjunction = function Disjunction(props) {
  _classCallCheck(this, Disjunction);
};

exports.default = Context;