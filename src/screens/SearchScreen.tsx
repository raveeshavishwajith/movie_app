import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {useState} from 'react';
import SubMovieCard from '../components/SubMovieCard';
import {baseImagePath, searchMovies} from '../api/apicalls';
import InputHeader from '../components/InputHeader';

const {width, height} = Dimensions.get('screen');

const SearchScreen = ({navigation}: any) => {
  const [searchList, setSearchList] = useState([]);

  const searchMoviesFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.error(
        ' Something went wrong in searchMoviesFunction Function',
        error,
      );
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
          data={searchList}
          bounces={false}
          keyExtractor={(item: any) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction} />
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}) => (
            <SubMovieCard
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
              shouldMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFuntion={() => {
                navigation.push('MovieDetails', {movieId: item.id});
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
    width,
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_38,
    marginVertical: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
    display: 'flex',
  },
  centerContainer: {
    alignItems: 'center',
  },
});

export default SearchScreen;
