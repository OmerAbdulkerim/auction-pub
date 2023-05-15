package com.internship.atlantbh.auctionbackend.card;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/cards")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping
    public Iterable<Card> findAllCards() {
        return cardService.findAllCard();
    }

    @GetMapping("/{id}")
    public Optional<Card> findCardById(@PathVariable("id") final UUID id) {
        return cardService.findById(id);
    }
}
