import React, {PropTypes} from 'react'
import classnames from 'classnames'
import calculateSize from 'calculate-size'

import Dropdown from 'shared/components/Dropdown'

import omit from 'lodash/omit'

const minTempVarDropdownWidth = 146
const maxTempVarDropdownWidth = 300
const tempVarDropdownPadding = 30

const TemplateControlBar = ({
  templates,
  onSelectTemplate,
  onOpenTemplateManager,
  isOpen,
}) =>
  <div className={classnames('template-control-bar', {show: isOpen})}>
    <div className="template-control--container">
      <div className="template-control--controls">
        {templates.length
          ? templates.map(({id, values, tempVar}) => {
              const items = values.map(value => ({...value, text: value.value}))
              const itemValues = values.map(value => value.value)
              const selectedItem = items.find(item => item.selected) || items[0]
              const selectedText = selectedItem && selectedItem.text
              let customDropdownWidth = 0
              if (itemValues.length > 1) {
                const longest = itemValues.reduce(
                  (a, b) => (a.length > b.length ? a : b)
                )
                const longestLengthPixels =
                  calculateSize(longest, {
                    font: 'Monospace',
                    fontSize: '12px',
                  }).width + tempVarDropdownPadding

                if (
                  longestLengthPixels > minTempVarDropdownWidth &&
                  longestLengthPixels < maxTempVarDropdownWidth
                ) {
                  customDropdownWidth = longestLengthPixels
                } else if (longestLengthPixels > maxTempVarDropdownWidth) {
                  customDropdownWidth = maxTempVarDropdownWidth
                }
              }

              // TODO: change Dropdown to a MultiSelectDropdown, `selected` to
              // the full array, and [item] to all `selected` values when we update
              // this component to support multiple values
              return (
                <div
                  key={id}
                  className="template-control--dropdown"
                  style={
                    customDropdownWidth > 0
                      ? {minWidth: customDropdownWidth}
                      : null
                  }
                >
                  <Dropdown
                    items={items}
                    buttonSize="btn-xs"
                    menuClass="dropdown-astronaut"
                    useAutoComplete={true}
                    selected={selectedText || '(No values)'}
                    onChoose={item =>
                      onSelectTemplate(id, [item].map(x => omit(x, 'text')))}
                  />
                  <label className="template-control--label">
                    {tempVar}
                  </label>
                </div>
              )
            })
          : <div className="template-control--empty">
              This dashboard does not have any Template Variables
            </div>}
      </div>
      <button
        className="btn btn-primary btn-sm template-control--manage"
        onClick={onOpenTemplateManager}
      >
        <span className="icon cog-thick" />
        Manage
      </button>
    </div>
  </div>

const {arrayOf, bool, func, shape, string} = PropTypes

TemplateControlBar.propTypes = {
  templates: arrayOf(
    shape({
      id: string.isRequired,
      values: arrayOf(
        shape({
          value: string.isRequired,
        })
      ),
      tempVar: string.isRequired,
    })
  ).isRequired,
  onSelectTemplate: func.isRequired,
  onOpenTemplateManager: func.isRequired,
  isOpen: bool,
}

export default TemplateControlBar
