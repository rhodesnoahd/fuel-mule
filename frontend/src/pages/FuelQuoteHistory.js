import { useSelector, useDispatch } from "react-redux"
import Quote from "../components/Quote"
import { setQuotes } from "../redux/features/fuelQuote"
import { useLoaderData } from "react-router-dom"

const FuelQuoteHistory = () => {
  const userId = useSelector((state) => state.user.userId)

  const dispatch = useDispatch()

  const allQuotes = useLoaderData()
  const userQuotes = allQuotes.history?.filter(
    (quote) => quote.user_credentials === userId
  )

  dispatch(setQuotes(userQuotes))

  const fuelQuotes = useSelector((state) => state.fuelQuote.quotes)

  // useEffect(() => {
  //   const getQuotes = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:3500/fuel-quote-history",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ user_credentials: userId }),
  //         }
  //       )
  //       const { message, history } = await response.json()
  //       if (response.status === 200 || response.status === 201) {
  //         dispatch(setQuotes(history))
  //       } else alert(message)
  //     } catch (error) {
  //       console.error(error)
  //       alert("Unable to complete request")
  //     }
  //   }
  //   getQuotes()
  //   return () => dispatch(setQuotes([]))
  // }, [dispatch, userId])

  return fuelQuotes.length ? (
    <div className="center">
      <h1>Fuel Quote History</h1>
      <table>
        <thead>
          <tr className="row">
            <th>Gallons Requested</th>
            <th>Delivery Address</th>
            <th>Delivery Date</th>
            <th>Suggested Price per Gallon</th>
            <th>Total Amount Due</th>
          </tr>
        </thead>
        <tbody>
          {fuelQuotes?.map(({ _id, ...rest }) => (
            <Quote key={_id} quoteProps={rest} />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <h1>No Fuel Quotes Yet!</h1>
  )
}

const quoteHistoryLoader = async () => {
  const response = await fetch("http://localhost:3500/fuel-quote-history", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response.json()
}

export { quoteHistoryLoader }
export default FuelQuoteHistory
