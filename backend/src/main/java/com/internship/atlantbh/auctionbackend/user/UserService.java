package com.internship.atlantbh.auctionbackend.user;

import com.internship.atlantbh.auctionbackend.address.Address;
import com.internship.atlantbh.auctionbackend.address.AddressService;
import com.internship.atlantbh.auctionbackend.address.RedactedAddress;
import com.internship.atlantbh.auctionbackend.card.Card;
import com.internship.atlantbh.auctionbackend.card.CardService;
import com.internship.atlantbh.auctionbackend.card.RedactedCard;
import com.internship.atlantbh.auctionbackend.helpers.FormValidationRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Year;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    final String PATTERN_EMAIL = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";
    final String PATTERN_NAME = "^([A-Z])([A-Za-z]{1,31})(\s[A-Za-z]{2,31}){0,4}$";
    final String PATTERN_LAST_NAME = "^([A-Z])([A-Za-z]{1,31})(\s[A-Za-z]{2,31}){0,4}$";
    final String PATTERN_PHONE = "^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$";
    final String PATTERN_CARD_NUMBER = "^([0-9]{4})+([-]+([0-9]{4})){3}$";
    final String PATTERN_FULL_NAME = "^([A-Z])([A-Za-z]{1,32})+(\s+(([A-Z])([A-Za-z]{1,32}))){0,5}$";
    final String PATTERN_CVV = "^[0-9]{3,4}$";
    final String PATTERN_STREET = "^(\\w+(\\s\\w+)*)$";
    final String PATTERN_CITY_COUNTRY_STATE = "^([A-Za-z]+(\\s?[\\-]?[a-zA-Z]+)*)$";
    final String PATTERN_ZIPCODE = "^[A-Za-z0-9][A-Za-z0-9\\- ]{0,10}[A-Za-z0-9]{0,6}$";
    final String MONTH_PATTERN = "^[0-9]{1,2}$";
    final String PATTERN_DOB = "^([0-9]{2}[/][0-9]{2}[/][0-9]{4})$";

    private final UserRepository userRepository;
    private final CardService cardService;
    private final AddressService addressService;

    public UserService(UserRepository userRepository, final CardService cardService, final AddressService addressService) {
        this.userRepository = userRepository;
        this.cardService = cardService;
        this.addressService = addressService;
    }

    public Page<User> findAllUsers(final Integer pageNo, final Integer pageSize) {
        return userRepository.findAll(PageRequest.of(pageNo, pageSize));
    }

    public User findById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public boolean existsByUsernameOrExistsByEmail(final String input) {
        boolean isEmail = input.matches("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
        return isEmail ? userRepository.existsByEmailIgnoreCase(input) : userRepository.existsByUsernameIgnoreCase(input);
    }

    public AccountInformation updateInformation(AccountInformation requestInformation, User user) throws FormValidationRequestException {
        int year = Year.now().getValue();

        RedactedCard requestedCard = requestInformation.getCard();
        RedactedAddress requestedAddress = requestInformation.getAddress();
        RedactedUser requestedUser = requestInformation.getRedactedUser();
        AccountInformation responseInformation = new AccountInformation();

        if (requestedCard != null) {
            if (requestedCard.getName() != null && !requestedCard.getName().equals("")
                    && requestedCard.getNumber() != null && !requestedCard.getNumber().equals("")
                    && requestedCard.getCvv() != null && requestedCard.getCvv() != 0
                    && requestedCard.getYear() != null && requestedCard.getYear() != 0
                    && requestedCard.getMonth() != null && requestedCard.getMonth() != 0) {
                if (!requestInformation.getCard().getCvv().toString().matches(PATTERN_CVV)) {
                    throw new FormValidationRequestException("CVV_PATTERN_MISMATCH", "cardCvc");
                }
                if (requestedCard.getMonth() == null || !requestedCard.getMonth().toString().matches(MONTH_PATTERN) || requestedCard.getMonth() > 12) {
                    throw new FormValidationRequestException("CARD_MONTH_MISMATCH", "cardMonth");
                }
                if (requestedCard.getYear() < year || requestedCard.getYear() > year + 100) {
                    throw new FormValidationRequestException("CARD_YEAR_MISMATCH", "cardYear");
                }
                if (!requestInformation.getCard().getNumber().matches(PATTERN_CARD_NUMBER)) {
                    throw new FormValidationRequestException("CARD_NUMBER_PATTERN_MISMATCH", "cardNumber");
                }
                if (!requestInformation.getCard().getName().matches(PATTERN_FULL_NAME)) {
                    throw new FormValidationRequestException("CARD_NAME_PATTERN_MISMATCH", "cardName");
                }

                boolean hasCard = user.getCard() != null;
                Card card =  Card.builder()
                        .cardHolder(requestedCard.getName())
                        .cvv(requestedCard.getCvv())
                        .cardNumber(requestedCard.getNumber())
                        .expirationMonth(requestedCard.getMonth())
                        .expirationYear(requestedCard.getYear())
                        .build();

                if (hasCard) {
                    card.setId(user.getCard().getId());
                    card = cardService.updateCard(card);
                } else {
                    card = cardService.saveCard(card);
                    user.setCard(card);
                }
                responseInformation.setCard(card);
            }
        } else {
            responseInformation.setCard(user.getCard());
        }

        if (requestedAddress != null) {

            if (requestedAddress.getCity() != null && !requestedAddress.getCity().equals("")
                    && requestedAddress.getCountry() != null && !requestedAddress.getCountry().equals("")
                    && requestedAddress.getState() != null && !requestedAddress.getState().equals("")
                    && requestedAddress.getStreet() != null && !requestedAddress.getStreet().equals("")
                    && requestedAddress.getZipCode() != null && !requestedAddress.getZipCode().equals("")) {
                if (!requestedAddress.getCity().matches(PATTERN_CITY_COUNTRY_STATE)) {
                    throw new FormValidationRequestException("CITY_PATTERN_MISMATCH", "city");
                }
                if (!requestedAddress.getCountry().matches(PATTERN_CITY_COUNTRY_STATE)) {
                    throw new FormValidationRequestException("COUNTRY_PATTERN_MISMATCH", "country");
                }
                if (!requestedAddress.getState().matches(PATTERN_CITY_COUNTRY_STATE)) {
                    throw new FormValidationRequestException("STATE_PATTERN_MISMATCH", "state");
                }
                if (!requestedAddress.getStreet().matches(PATTERN_STREET)) {
                    throw new FormValidationRequestException("STREET_PATTERN_MISMATCH", "street");
                }
                if (!requestedAddress.getZipCode().matches(PATTERN_ZIPCODE)) {
                    throw new FormValidationRequestException("ZIPCODE_PATTERN_MISMATCH", "zipcode");
                }

                boolean hasAddress = user.getShippingAddress() != null;
                Address address = Address.builder()
                        .city(requestedAddress.getCity())
                        .country(requestedAddress.getCountry())
                        .state(requestedAddress.getState())
                        .street(requestedAddress.getStreet())
                        .zipCode(requestedAddress.getZipCode())
                        .build();

                if (hasAddress) {
                    address.setId(user.getShippingAddress().getId());
                    address = addressService.updateAddress(address);
                } else {
                    address = addressService.saveAddress(address);
                    user.setShippingAddress(address);
                }

                RedactedAddress redactedAddress = RedactedAddress.builder()
                        .city(address.getCity())
                        .zipCode(address.getZipCode())
                        .street(address.getStreet())
                        .state(address.getState())
                        .country(address.getCountry())
                        .build();
                responseInformation.setAddress(redactedAddress);
            }
        } else {
            RedactedAddress redactedAddressFromUser = RedactedAddress.builder()
                    .city(user.getShippingAddress().getCity())
                    .zipCode(user.getShippingAddress().getZipCode())
                    .street(user.getShippingAddress().getStreet())
                    .state(user.getShippingAddress().getState())
                    .country(user.getShippingAddress().getCountry())
                    .build();
            responseInformation.setAddress(redactedAddressFromUser);
        }

        if (requestedUser.getFirstName() != null && requestedUser.getLastName() != null && requestedUser.getEmail() != null && requestedUser.getPhone() != null && requestedUser.getDateOfBirth() != null
                && requestedUser.getProfilePictureUrl() != null && requestedUser.getDateOfBirth() != null
        ) {
            if (!requestedUser.getFirstName().matches(PATTERN_NAME))
                throw new FormValidationRequestException("FIRST_NAME_PATTERN_MISMATCH", "firstName");
            if (!requestedUser.getLastName().matches(PATTERN_LAST_NAME))
                throw new FormValidationRequestException("LAST_NAME_PATTERN_MISMATCH", "lastName");
            if (!requestedUser.getEmail().matches(PATTERN_EMAIL))
                throw new FormValidationRequestException("EMAIL_PATTERN_MISMATCH", "email");
            if (!requestedUser.getPhone().matches(PATTERN_PHONE))
                throw new FormValidationRequestException("PHONE_PATTERN_MISMATCH", "phone");
            if (!requestedUser.getDateOfBirth().matches(PATTERN_DOB))
                throw new FormValidationRequestException("DATE_OF_BIRTH_PATTERN_MISMATCH", "dateOfBirth");

            try {
                DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
                formatter.parse(requestedUser.getDateOfBirth());
            } catch (ParseException ex) {
                throw new FormValidationRequestException("DATE_OF_BIRTH_PATTERN_MISMATCH", "dateOfBirth");
            }

            if (user.getDateOfBirth() == null) user.setDateOfBirth("");
            if (user.getProfilePictureUrl() == null) user.setProfilePictureUrl("");

            if (!user.getFirstName().equals(requestedUser.getFirstName())
                    || !user.getLastName().equals((requestedUser.getLastName()))
                    || !user.getPhoneNumber().equals(requestedUser.getPhone())
                    || !user.getEmail().equals(requestedUser.getEmail())
                    || !user.getDateOfBirth().equals(requestedUser.getDateOfBirth())
                    || !user.getProfilePictureUrl().equals(requestedUser.getProfilePictureUrl())
            ) {
                user.setFirstName(requestedUser.getFirstName());
                user.setLastName(requestedUser.getLastName());
                user.setPhoneNumber(requestedUser.getPhone());
                user.setEmail(requestedUser.getEmail());
                user.setDateOfBirth(requestedUser.getDateOfBirth());
                user.setProfilePictureUrl(requestedUser.getProfilePictureUrl());
            }
        }
        user = saveUser(user);
        responseInformation.setRedactedUser(user);
        return responseInformation;
    }

    @Override
    public User loadUserByUsername(final String username) throws UsernameNotFoundException {

        boolean isEmail = username.matches("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");

        Optional<User> userOptional = isEmail ? userRepository.findByEmailIgnoreCase(username) : userRepository.findByUsernameIgnoreCase(username);

        return userOptional.orElseThrow(() -> new UsernameNotFoundException("Credentials not valid"));
    }
}
