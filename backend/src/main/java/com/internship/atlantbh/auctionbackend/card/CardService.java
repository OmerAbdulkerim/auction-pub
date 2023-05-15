package com.internship.atlantbh.auctionbackend.card;

import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public Iterable<Card> findAllCard() {
        return cardRepository.findAll();
    }

    public Card updateCard(Card card) {
        return cardRepository.save(card);
    }
    
    public Card saveCard(Card card) {
        return cardRepository.save(card);
    }

    public Optional<Card> findById(UUID id) {
        return cardRepository.findById(id);
    }
}
