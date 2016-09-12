package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"io"
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"

	strfmt "github.com/go-openapi/strfmt"

	"github.com/influxdata/mrfusion/models"
)

// NewPutDashboardsIDParams creates a new PutDashboardsIDParams object
// with the default values initialized.
func NewPutDashboardsIDParams() PutDashboardsIDParams {
	var ()
	return PutDashboardsIDParams{}
}

// PutDashboardsIDParams contains all the bound params for the put dashboards ID operation
// typically these are obtained from a http.Request
//
// swagger:parameters PutDashboardsID
type PutDashboardsIDParams struct {

	// HTTP Request Object
	HTTPRequest *http.Request

	/*dashboard configuration update parameters
	  Required: true
	  In: body
	*/
	Config *models.Dashboard
	/*ID of a dashboard
	  Required: true
	  In: path
	*/
	ID string
}

// BindRequest both binds and validates a request, it assumes that complex things implement a Validatable(strfmt.Registry) error interface
// for simple values it will use straight method calls
func (o *PutDashboardsIDParams) BindRequest(r *http.Request, route *middleware.MatchedRoute) error {
	var res []error
	o.HTTPRequest = r

	if runtime.HasBody(r) {
		defer r.Body.Close()
		var body models.Dashboard
		if err := route.Consumer.Consume(r.Body, &body); err != nil {
			if err == io.EOF {
				res = append(res, errors.Required("config", "body"))
			} else {
				res = append(res, errors.NewParseError("config", "body", "", err))
			}

		} else {
			if err := body.Validate(route.Formats); err != nil {
				res = append(res, err)
			}

			if len(res) == 0 {
				o.Config = &body
			}
		}

	} else {
		res = append(res, errors.Required("config", "body"))
	}

	rID, rhkID, _ := route.Params.GetOK("id")
	if err := o.bindID(rID, rhkID, route.Formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (o *PutDashboardsIDParams) bindID(rawData []string, hasKey bool, formats strfmt.Registry) error {
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	o.ID = raw

	return nil
}