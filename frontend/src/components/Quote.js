function Quote({ quoteProps }) {
  let {
    gallons_requested,
    address1,
    city,
    _state,
    zipcode,
    delivery_date,
    suggested_price,
    total_amount_due,
  } = quoteProps
  suggested_price = (
    Math.round((suggested_price + Number.EPSILON) * 100) / 100
  ).toFixed(2)
  total_amount_due = (
    Math.round((total_amount_due + Number.EPSILON) * 100) / 100
  ).toFixed(2)
  return (
    <tr className="row">
      <td>{gallons_requested}</td>
      <td>
        {address1} {city} {_state} {zipcode}
      </td>
      <td>{delivery_date}</td>
      <td>{"$" + suggested_price}</td>
      <td>{"$" + total_amount_due}</td>
    </tr>
  )
}

export default Quote
