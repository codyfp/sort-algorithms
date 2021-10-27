// render a table row with 2 columns
/**
 * @param {string} sortMethod
 * @param {string} array
 */

export default function sortTableRow(sortMethod, array) {
	return (
		<tr>
			<td>{sortMethod}</td>
			<td>{array.print()}</td>
		</tr>
	)
}