describe("jQuery UI Draggable Plugin Multiple", function () {

	var left, draggableElements, selectedElements;

	function makeDraggable(element, multipleOptions) {
		multipleOptions = multipleOptions || {};
		element.appendTo('body').draggable({
			multiple: multipleOptions
		}).css({
			top: '20px',
			left: (left += 20) + 'px',
			width: '20px',
			height: '20px',
			position: 'absolute',
			background: 'white',
			border: '2px solid blue'
		}).addClass('ui-selected').attr('id', left);
		draggableElements = $('.ui-draggable');
		selectedElements = $('.ui-selected');
	}

	function basicDragTest(expectedPositions) {
		var element, resultingPositions;
		expectedPositions = expectedPositions || selectedElements.map(function () {
			var expected = {}, position = $(this).position();
			expected.top = position.top + 40;
			expected.left = position.left + 40;
			return expected;
		});
		// drag the first element 40 px
		element = selectedElements.first();
		element.simulate('drag', {dx: 40, dy: 40});
		// validate all three elements moved by 40px
		resultingPositions = selectedElements.map(function () {
			return $(this).position();
		});
		expect(resultingPositions[0]).toEqualHash(expectedPositions[0]);
		expect(resultingPositions[1]).toEqualHash(expectedPositions[1]);
		expect(resultingPositions[2]).toEqualHash(expectedPositions[2]);
	}

	beforeEach(function () {

		// the ui
		left = 0;
		draggableElements = $([]);
		makeDraggable($('<div>'));
		makeDraggable($('<div>'));
		makeDraggable($('<div>'));

	});

	afterEach(function () {
		draggableElements.remove();
	});

	describe("with default options", function () {
		it("drag items with class 'ui-draggable' and 'ui-selected'", function () {
			basicDragTest();
		});
		describe("when drag target is not a selected element", function () {
			var element;
			beforeEach(function () {
				element = selectedElements.first().removeClass('ui-selected');
			});
			it("remove the 'ui-selected' class from the 'ui-draggable' elements", function () {
				// drag the first element 40 px
				element.simulate('drag', {dx: 40, dy: 40});
				// validate
				expect($('.ui-selected').length).toBe(0);
			});
			it("only move the drag target and not the others", function () {
				var expectedPositions;
				// setup
				expectedPositions = draggableElements.map(function () {
					var expected = {},
						position = $(this).position();
					if (this === element[0]) {
						// we will move this one...
						expected.top = position.top + 40;
						expected.left = position.left + 40;
					} else {
						// ...but not these others
						expected.top = position.top;
						expected.left = position.left;
					}
					return expected;
				});
				// validate
				basicDragTest(expectedPositions);
			});

		});

	});

	describe("callback options", function () {
		var callbackSpy;
		beforeEach(function () {
			callbackSpy = jasmine.createSpy('callbackSpy');
		});
		describe("items<function()>", function () {
			beforeEach(function () {
				callbackSpy.andReturn(selectedElements);
			});
			it("is called to get the selected items", function () {
				var element = selectedElements.first();
				// setup
				element.draggable('option', 'multiple', {items: callbackSpy});
				// drag the first element 40 px
				element.simulate('drag', {dx: 40, dy: 40});
				// validate
				expect(callbackSpy).toHaveBeenCalled();
			});
			it("drags the returned items", function () {
				// setup
				draggableElements.removeClass('ui-selected');
				makeDraggable($('<div>'));
				makeDraggable($('<div>'));
				makeDraggable($('<div>'));
				// validate
				basicDragTest();
			});
		});
		describe("beforeStart<function(jqEvent, helper)>", function () {
			it("is called once before drag starts", function () {
				var element = draggableElements.first();
				// setup
				element.draggable('option', 'multiple', {beforeStart: callbackSpy});
				// drag the first element 40 px
				element.simulate('drag', {dx: 40, dy: 40});
				// validate
				expect(callbackSpy).toHaveBeenCalled();
				expect(callbackSpy.calls.length).toBe(1);
			});
			it("cancels drag multiple if beforeStart returns false", function () {
				var element, expectedPositions;
				// setup
				element = draggableElements.first();
				callbackSpy.andReturn(false);// only drag the target
				element.draggable('option', 'multiple', {beforeStart: callbackSpy});
				expectedPositions = draggableElements.map(function () {
					var expected = {},
						position = $(this).position();
					if (this === element[0]) {
						// we will move this one...
						expected.top = position.top + 40;
						expected.left = position.left + 40;
					} else {
						// ...but not these others
						expected.top = position.top;
						expected.left = position.left;
					}
					return expected;
				});
				// validate
				basicDragTest(expectedPositions);
			});
		});
		describe("beforeDrag<function(jqEvent, helper)>", function () {
			it("is called repeatedly during drag", function () {
				var element = draggableElements.first();
				// setup
				element.draggable('option', 'multiple', {beforeDrag: callbackSpy});
				// drag the first element 40 px
				element.simulate('drag', {dx: 40, dy: 40, moves: 3});
				// validate
				expect(callbackSpy).toHaveBeenCalled();
				expect(callbackSpy.calls.length).toBe(3);
			});
		});
		describe("beforeStop<function(jqEvent, helper)>", function () {
			it("is called once when drag stops", function () {
				var element = draggableElements.first();
				// setup
				element.draggable('option', 'multiple', {beforeStop: callbackSpy});
				// drag the first element 40 px
				element.simulate('drag', {dx: 40, dy: 40});
				// validate
				expect(callbackSpy).toHaveBeenCalled();
				expect(callbackSpy.calls.length).toBe(1);
			});
		});
	});
	describe("jQueryUI::Draggable Options Support", function () {
		describe("draggable.options.revert", function () {
			describe("when revert option is set to true", function () {
				it("revert the selected elements to original position", function () {
					draggableElements.draggable('option', 'revert', true);
					var expectedPositions = selectedElements.map(function () {
						var expected = {}, position = $(this).position();
						expected.top = position.top;
						expected.left = position.left;
						return expected;
					});
					basicDragTest(expectedPositions);
				});
			});
			describe("when revert option is set to 'invalid'", function () {
				it("the value is ignored (feature not implemented)", function () {
					draggableElements.draggable('option', 'revert', 'invalid');
					basicDragTest();
				});
			});
			describe("when revert option is set to 'valid'", function () {
				it("the value is ignored (feature not implemented)", function () {
					draggableElements.draggable('option', 'revert', 'valid');
					basicDragTest();
				});
			});
			describe("when revert option is set to function returning true", function () {
				it("the value is ignored (feature not implemented)", function () {
					var revertSpy = jasmine.createSpy('revertSpy').andReturn(true);
					draggableElements.draggable('option', 'revert', revertSpy);
					basicDragTest();
				});
			});
			describe("when revert option is set to function returning false", function () {
				it("the value is ignored (feature not implemented)", function () {
					var revertSpy = jasmine.createSpy('revertSpy').andReturn(false);
					draggableElements.draggable('option', 'revert', revertSpy);
					basicDragTest();
				});
			});
		});
		describe("draggable.options.helper", function () {
			describe("when helper option is set to 'original'", function () {
				it("the original element is moved", function () {
					draggableElements.draggable('option', 'helper', 'original');
					basicDragTest();
				});
			});
			describe("when helper option is set to 'clone'", function () {
				it("the value is ignored (feature not implemented)", function () {
					draggableElements.draggable('option', 'helper', 'clone');
					basicDragTest();
				});
			});
			describe("when helper option is set to a <function()>", function () {
				it("the value is ignored (feature not implemented)", function () {
					draggableElements.draggable('option', 'helper', function () {
						return $('<div>').addClass('test-helper').css({
							position: 'absolute',
							top: '15px',
							left: '15px',
							width: '15px',
							height: '15px',
							background: 'white',
							opacity: '0.5'
						}).appendTo('body');
					});
					var expected = $('.test-helper').position();
					basicDragTest();
					var result = $('.test-helper').position();
					expect(result).toEqualHash(expected);
				});
			});
		});
	});

});