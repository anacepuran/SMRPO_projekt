export function SET_CARD (state, fetchedCards) {
  state.cards = fetchedCards
}
export function PUSH_NEW_CARD (state, newCard) {
  var pushCard = {
    sprint_id: newCard.sprint_id,
    card_name: newCard.card_name,
    description: newCard.description,
    acceptance_test: newCard.acceptance_test,
    priority: newCard.priority,
    subtasks: newCard.subtasks,
    value: newCard.value,
    card_round: newCard.card_round
  }
  state.cards[newCard._id] = pushCard
}
export function DELETE_CARD (state, cardId) {
  delete state.cards[cardId]
}
